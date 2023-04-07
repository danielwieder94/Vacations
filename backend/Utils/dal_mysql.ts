import mysql from "mysql";
import config from "./Config";

const connection = mysql.createPool({
  host: config.mySQLhost,
  user: config.mySQLuser,
  password: config.mySQLpass,
  database: config.mySQLdb,
});

const execute = (sql: string, params?: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    console.log("SQL query:", sql);
    console.log("Parameters:", params);
    connection.query(sql, params, (err, result) => {
      if (err) {
        console.log("Error in dal_mysql.ts: ", err);
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

export default { execute };
