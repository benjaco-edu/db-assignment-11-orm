// @ts-ignore
let fs = require("fs");
// @ts-ignore
let filename:string = process.argv[2];
let classdef:any = JSON.parse(fs.readFileSync(filename));


let schemaName:string = classdef.schemaName;

let classes: string[] = classdef.entities.reduce((acc, val, index) => {acc[Object.keys(val)[0]]=index; return acc},{});

let src:string = "import * as orm from './src/orm'; \n";
let sql:string = `CREATE DATABASE \`${schemaName}\`;\nUSE \`${schemaName}\`;\n`;

let sqlTypes: object = {
    "String": "TEXT",
    "Number": "INT"
};

for (let className of Object.keys(classes)) {
    let referenced_to: string[] = [];

    src += `export class ${className}{
  static _id: string = "${className}_id";
  ${className}_id: number; \n`;

    sql += `CREATE TABLE \`${className}\` (
  \`${className}_id\` INT AUTO_INCREMENT,\n`;

    for(let prop of Object.keys(classdef.entities[classes[className]][className])){
        let val : string = classdef.entities[classes[className]][className][prop];
        // @ts-ignore
        if (val.startsWith("*")) {
            referenced_to.push(val.slice(1));
            src += `  async get${val.slice(1)}s() : Promise<${val.slice(1)}[]>  { return orm.query("(${val.slice(1)}|${className}_id="+this.${className}_id+")")   }\n`;

        } else {
            // @ts-ignore
            if (["String", "Number"].includes(val)) {
                src += `  ${prop}: ${val.toLowerCase()}; \n`;
                sql += `  \`${prop}\` ${sqlTypes[val]}, \n`
            } else {
                // todo generate code to get object
                src += `  ${val}_id : Number;
  async get${val}() : Promise<${val}> { return orm.query("(${val}|${val}_id="+this.${val}_id+")")   }\n`;
                sql += `  \`${val}_id\` INT, \n`
            }
        }
    }
    src += `  static _refs: string[] = ${JSON.stringify(referenced_to)}\n`;
    src += `}\n`;


    sql += `  PRIMARY KEY (\`${className}_id\`)
);\n`;
}

fs.writeFileSync("orm.ts", src);
fs.writeFileSync("database.sql", sql);