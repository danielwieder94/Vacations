import mysql from "mysql";
import config from "./Config";

const connection = mysql.createPool({
  host: process.env.MYSQL_HOST || config.mySQLhost,
  user: process.env.MYSQL_USER || config.mySQLuser,
  password: process.env.MYSQL_PASSWORD || config.mySQLpass,
  database: process.env.MYSQL_DATABASE || config.mySQLdb,
});

const execute = (sql: string, params?: any): Promise<any> => {
  return new Promise<any>((resolve, reject) => {
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
