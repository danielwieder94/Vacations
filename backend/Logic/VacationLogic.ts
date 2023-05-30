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
            vacDesc VARCHAR(1020) NOT NULL,
            vacImg VARCHAR(255) NOT NULL,
            startDate DATE NOT NULL,
            endDate DATE NOT NULL,
            vacPrice INT NOT NULL,
            likes INT NOT NULL DEFAULT 0
            )`;
  const result: OkPacket = await dal_mysql.execute(sql);
};
//format date for mySQL date type
const formatDate = (date: Date): string => {
  const formattedDate = new Date(date).toISOString().split("T")[0];
  return formattedDate;
};

//add vacation
const addVacation = async (vacation: Vacation) => {
  const sql = `INSERT INTO vacations.vacations_list (destination, vacDesc, vacImg, startDate, endDate, vacPrice) VALUES (?, ?,  ?, ?, ?, ?)`;
  const result: OkPacket = await dal_mysql.execute(sql, [
    vacation.destination,
    vacation.vacDesc,
    vacation.vacImg,
    formatDate(vacation.startDate),
    formatDate(vacation.endDate),
    vacation.vacPrice,
  ]);
  return new Vacation(
    result.insertId,
    vacation.destination,
    vacation.startDate,
    vacation.endDate,
    vacation.vacDesc,
    vacation.vacPrice,
    vacation.vacImg
  );
};

//upload image to "public" folder

//edit vacation
const updateVacation = async (vacation: Vacation) => {
  return await dal_mysql.execute(
    `UPDATE vacations.vacations_list
SET destination = ?, vacDesc = ?, vacImg = ?, startDate = ?, endDate = ?, vacPrice = ?
WHERE id = ?`,
    [
      vacation.destination,
      vacation.vacDesc,
      vacation.vacImg,
      formatDate(vacation.startDate),
      formatDate(vacation.endDate),
      vacation.vacPrice,
      vacation.id,
    ]
  );
};
//delete vacation

//get all vacations
const getAllVacations = async () => {
  return await dal_mysql.execute(
    `SELECT * FROM vacations.vacations_list ORDER BY startDate ASC`,
    []
  );
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

const getVacationById = async (id: number) => {
  const [row] = await dal_mysql.execute(
    `SELECT *, 
            CONVERT_TZ(startDate, '+00:00', @@session.time_zone) AS startDate,
            CONVERT_TZ(endDate, '+00:00', @@session.time_zone) AS endDate
     FROM vacations.vacations_list WHERE id = ?`,
    [id]
  );
  console.log(row);
  return row;
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

const deleteVacation = async (id: number) => {
  const sql = `DELETE FROM vacations.vacations_list WHERE id = ?`;
  const result: OkPacket = await dal_mysql.execute(sql, [id]);
};

export default {
  createVacationsTable,
  getAllVacations,
  addVacation,
  getVacationById,
  updateVacation,
  deleteVacation,
};
