import Vacation from "../Models/Vacation";
import dal_mysql from "../Utils/dal_mysql";
import { Request, Response } from "express";
import { OkPacket } from "mysql";
import { deleteImage } from "./FileUpload";

//create vacationsTable
const createVacationsTable = async () => {
  const sql = `
            CREATE TABLE IF NOT EXISTS vacations_db.vacations_list (
            id INT AUTO_INCREMENT PRIMARY KEY,
            destination VARCHAR(255) NOT NULL,
            vacDesc VARCHAR(1020) NOT NULL,
            vacImg VARCHAR(255) NOT NULL,
            startDate DATE NOT NULL,
            endDate DATE NOT NULL,
            vacPrice INT NOT NULL
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
  const sql = `INSERT INTO vacations_db.vacations_list (destination, vacDesc, vacImg, startDate, endDate, vacPrice) VALUES (?, ?,  ?, ?, ?, ?)`;
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
    vacation.vacImg,
    vacation.likes
  );
};

//edit vacation
const updateVacation = async (vacation: Vacation) => {
  return await dal_mysql.execute(
    `UPDATE vacations_db.vacations_list
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
    `SELECT * FROM vacations_db.vacations_list ORDER BY startDate ASC`,
    []
  );
};

//get vacations by destination
const getVacationByDest = async (destination: string) => {
  return await dal_mysql.execute(
    `SELECT * FROM vacations_db.vacations_list WHERE destination = ?`,
    [destination]
  );
};

const getVacationById = async (id: number) => {
  const [row] = await dal_mysql.execute(
    `SELECT *, 
            CONVERT_TZ(startDate, '+00:00', @@session.time_zone) AS startDate,
            CONVERT_TZ(endDate, '+00:00', @@session.time_zone) AS endDate
     FROM vacations_db.vacations_list WHERE id = ?`,
    [id]
  );
  return row;
};

//get vacations by likes (for admin reports)
const getVacationByLikes = async () => {
  const sql = `SELECT vacation_list.* 
    FROM vacations_db.vacations_list AS vacation_list
    JOIN vacations_db.likes AS likes
    ON vacation_list.id = likes.vacationId
    GROUP BY vacation_list.id
    HAVING COUNT(likes.vacationId) > 0`;
  const result: OkPacket = await dal_mysql.execute(sql);
};

const deleteVacation = async (id: number) => {
  const checkLikes = `SELECT likes FROM vacations_db.vacations_list WHERE id = ?`;
  const likeResult: { likes: number }[] = await dal_mysql.execute(checkLikes, [
    id,
  ]);
  const likesCount = likeResult[0].likes;

  const deleteSql = `DELETE FROM vacations_db.vacations_list WHERE id = ?`;
  await dal_mysql.execute(deleteSql, [id]);

  if (likesCount > 0) {
    const updateUserLikes = `UPDATE users
    SET likedVacations = JSON_REMOVE(likedVacations, (JSON_SEARCH(likedVacations, 'one', CAST(? AS JSON))))
    WHERE JSON_CONTAINS(likedVacations, CAST(? AS JSON))
  `;
    await dal_mysql.execute(updateUserLikes, [id.toString(), id.toString()]);

    const deleteLikes = `DELETE FROM likes
    WHERE vacationId = ?`;
    await dal_mysql.execute(deleteLikes, [id]);
  }

  await deleteImage(id);
};

export default {
  createVacationsTable,
  getAllVacations,
  addVacation,
  getVacationById,
  updateVacation,
  deleteVacation,
};
