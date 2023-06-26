import dal_mysql from "../Utils/dal_mysql";
import { Request, Response, response } from "express";
import { OkPacket } from "mysql";
import User from "../Models/User";
import Vacation from "../Models/Vacation";

const toggleLike = async (userId: number, vacationId: number) => {
  const userSql = `
    SELECT likedVacations
    FROM users
    WHERE id = ?
  `;
  const userResult: { likedVacations: number[] } = await dal_mysql.execute(
    userSql,
    [userId]
  );
  const currentLikedVacations: number[] = userResult[0].likedVacations;
  // ? JSON.parse(userResult[0].likedVacations)
  // : [];
  if (currentLikedVacations.includes(vacationId)) {
    // Remove the like
    const index = currentLikedVacations.indexOf(vacationId);
    currentLikedVacations.splice(index, 1);

    const removeLikeSql = `
      DELETE FROM likes
      WHERE vacationId = ? AND userId = ?
    `;
    await dal_mysql.execute(removeLikeSql, [vacationId, userId]);

    const updateVacationSql = `
      UPDATE vacations_list
      SET likes = likes - 1
      WHERE id = ?
    `;
    await dal_mysql.execute(updateVacationSql, [vacationId]);
  } else {
    // Add the like
    currentLikedVacations.push(vacationId);
    const addLikeSql = `
      INSERT INTO likes (vacationId, userId)
      VALUES (?, ?)
    `;
    await dal_mysql.execute(addLikeSql, [vacationId, userId]);

    const updateVacationSql = `
      UPDATE vacations_list
      SET likes = likes + 1
      WHERE id = ?
    `;
    await dal_mysql.execute(updateVacationSql, [vacationId]);
  }

  const updateLikedVacationsSql = `
    UPDATE users
    SET likedVacations = ?
    WHERE id = ?
  `;
  await dal_mysql.execute(updateLikedVacationsSql, [
    JSON.stringify(currentLikedVacations),
    userId,
  ]);
};

const getLikesByUser = async (userId: number) => {
  const sql = `
      SELECT vacations_list.id
      FROM vacations.likes
      INNER JOIN vacations.vacations_list ON likes.vacationId = vacations_list.id
      WHERE likes.userId = ?  
    `;
  const result: Vacation[] = await dal_mysql.execute(sql, [userId]);
  return result;
};

const getLikesPerVacation = async () => {
  const sql = `
      SELECT destination, likes
      FROM vacations.vacations_list
    `;
  const result: any = await dal_mysql.execute(sql);
  return result;
};

export default { toggleLike, getLikesByUser, getLikesPerVacation };
