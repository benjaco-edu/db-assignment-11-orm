import * as mysql from "mysql2";
import * as model from "./../orm";


let connection;

export function connect(config: mysql.ConnectionOptions) {
    connection = mysql.createConnection(config);
}

function generateSql(query: string) {

    let parts = query.split(".");
    let selection = "*";
    let source = "";
    let lastTable = "";
    let returnType = "list";

    for (let part of parts) {
        if (part.startsWith("(")) { // table with condition
            part = part.substring(1, part.length - 1);
            let [table, where] = part.split("|");


            let substatement = " (select * from `" + table + "` where "+where+") as `" + table + "` ";

            if (source === "") {
                source += " from "+substatement;
            } else {
                // left join OrderLine on `OrderLine`.Order_id = `Order`.Order_id
                let left_relationship = model[lastTable]._refs.includes(table);
                if (left_relationship) {
                    source += "\n   inner join "+substatement+" on `" + table + "`.`" + lastTable + "_id` = `" + lastTable + "`.`" + lastTable + "_id`";
                }else{
                    source += "\n   inner join "+substatement+" on `" + table + "`.`" + table + "_id` = `" + lastTable + "`.`" + table + "_id`";
                }
            }


            lastTable = table;
            selection = "`"+table + "`.*";
            returnType = table;


        }else if(part.charAt(0) == part.charAt(0).toUpperCase()){ // table

            if (source === "") {
                source += " from `" + part + "` ";
            } else {
                // inner join OrderLine on `OrderLine`.Order_id = `Order`.Order_id
                let left_relationship = model[lastTable]._refs.includes(part);
                if (left_relationship) {
                    source += "\n   inner join `" + part + "` on `" + part + "`.`" + lastTable + "_id` = `" + lastTable + "`.`" + lastTable + "_id`"
                }else{
                    source += "\n   inner join `" + part + "` on `" + part + "`.`" + part + "_id` = `" + lastTable + "`.`" + part + "_id`"
                }

            }


            lastTable = part;
            selection = "`"+part + "`.*";
            returnType = part;

        } else { // selection
            selection = "`"+lastTable+"`.`"+part+"`";
            returnType = "list";
        }
    }


    return [`select ${selection} ${source} `, returnType];

}

function convertToDesiredType(data: any, returntype: string) {
    let result = [];

    if (returntype === "list") {
        for (let row of data) {
            result.push(row[Object.keys(row)[0]])
        }
    } else {
        for(let row of data){
            let obj = new model[returntype]();
            for (let prop of Object.keys(row)) {
                obj[prop] = row[prop];
            }
            result.push(obj);
        }
    }

    return result;
}

export async function query(query: string): Promise<any> {
    let [sql, returntype] = generateSql(query);


    let data = await new Promise((resolve, reject) => {
        connection.query(
            sql,
            function (err, results, fields) {
                if (err) {
                    reject(err);
                }
                resolve(results);
            }
        );
    });

    let dataset = convertToDesiredType(data, returntype)

    return dataset;

}

