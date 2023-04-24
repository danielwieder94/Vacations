import Vacation from "../Models/Vacation";
import dal_mysql from "../Utils/dal_mysql";
import { Request, Response } from "express";
import { OkPacket } from "mysql";

//create vacationsTable
const createVacationsTable = async () => {
  const sql = `
            CREATE TABLE IF NOT EXISTS vacations.vacations_list (
            id INT AUTO_INCREMENT PRIMARY KEY,
            destination VARCHAR(255) NOT NULL,
            description VARCHAR(255) NOT NULL,
            image VARCHAR(255) NOT NULL,
            startDate DATE NOT NULL,
            endDate DATE NOT NULL,
            price INT NOT NULL,
            likes INT NOT NULL DEFAULT 0
            )`;
  const result: OkPacket = await dal_mysql.execute(sql);
};
//add vacation
const addVacation = async (vacation: Vacation) => {
  const sql = `INSERT INTO vacations.vacations_list (destination, description, image, startDate, endDate, price) VALUES (?, ?,  ?, ?, ?, ?)`;
  const result: OkPacket = await dal_mysql.execute(sql, [
    vacation.destination,
    vacation.vacDesc,
    vacation.vacImg,
    formatDate(vacation.startDate),
    formatDate(vacation.endDate),
    vacation.vacPrice,
  ]);
  return result.insertId;
};

//edit vacation

//delete vacation

//get all vacations
const getAllVacations = async () => {
  return await dal_mysql.execute(`SELECT * FROM vacations.vacations_list`, []);
  // const sql = `SELECT * FROM vacations.vacations_list`;
  // const result: OkPacket = await dal_mysql.execute(sql);
};

//get vacations by destination
const getVacationByDest = async (destination: string) => {
  return await dal_mysql.execute(
    `SELECT * FROM vacations.vacations_list WHERE destination = ?`,
    [destination]
  );
  // const sql = `SELECT * FROM vacations.vacations_list WHERE destination = ?`;
  // const result: OkPacket = await dal_mysql.execute(sql, [destination]);
};

//get vacations by date
const getVacationByDate = async (startDate: Date, endDate: Date) => {
  return await dal_mysql.execute(
    `SELECT * FROM vacations.vacations_list WHERE startDate = ? AND endDate = ?`,
    [startDate, endDate]
  );
  // const sql = `SELECT * FROM vacations.vacations_list WHERE startDate = ? AND endDate = ?`;
  // const result: OkPacket = await dal_mysql.execute(sql, [startDate, endDate]);
};

//get vacations by likes (for admin reports)
const getVacationByLikes = async () => {
  const sql = `SELECT vacation_list.* 
    FROM vacations.vacations_list AS vacation_list
    JOIN vacations.likes AS likes
    ON vacation_list.id = likes.vacationId
    GROUP BY vacation_list.id
    HAVING COUNT(likes.vacationId) > 0`;
  const result: OkPacket = await dal_mysql.execute(sql);
};

//format date for mySQL date type
const formatDate = (date: Date): string => {
  const formattedDate = new Date(date).toISOString().split("T")[0];
  return formattedDate;
};
export default { createVacationsTable, getAllVacations, addVacation };
