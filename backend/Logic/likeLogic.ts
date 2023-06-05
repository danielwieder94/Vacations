import dal_mysql from "../Utils/dal_mysql";
import { Request, Response, response } from "express";
import { OkPacket } from "mysql";
import User from "../Models/User";
import Vacation from "../Models/Vacation";

const addLike = async (userId: number, vacationId: number) => {
  const transactionQuery = `
      START TRANSACTION;

      INSERT INTO vacations.likes (userId, vacationId) VALUES (?, ?);

      UPDATE vacations.vacations_list
      SET likes = likes + 1
      WHERE id = ?;

      UPDATE vacations.users
      SET vacations = vacations + 1
      WHERE id = ?;

      COMMIT;
    `;

  const result: OkPacket = await dal_mysql.execute(transactionQuery, [
    vacationId,
    userId,
    vacationId,
    userId,
  ]);
  return result.insertId;
};

export default { addLike };
