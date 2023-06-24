import mysql from "mysql2/promise";
import config from "./Config";

// const connection = mysql.createPool({
//   host: process.env.MYSQL_HOST || config.mySQLhost,
//   user: process.env.MYSQL_USER || config.mySQLuser,
//   password: process.env.MYSQL_PASSWORD || config.mySQLpass,
//   database: process.env.MYSQL_DATABASE || config.mySQLdb,
// });

// const execute = (sql: string, params?: any): Promise<any> => {
//   return new Promise<any>((resolve, reject) => {
//     connection.query(sql, params, (err, result) => {
//       if (err) {
//         console.log("Error in dal_mysql.ts: ", err);
//         reject(err);
//         return;
//       }
//       resolve(result);
//     });
//   });
// };
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST || config.mySQLhost,
  user: process.env.DB_USERNAME || config.mySQLuser,
  password: process.env.DB_PASSWORD || config.mySQLpass,
  database: process.env.MYSQL_DATABASE || config.mySQLdb,
});

const execute = (sql: string, params?: any): Promise<any> => {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const connection = await pool.getConnection();
      const [result] = await connection.query(sql, params);
      connection.release();
      resolve(result);
    } catch (err) {
      console.log("Error in dal_mysql.ts: ", err);
      reject(err);
    }
  });
};

export default { execute };
