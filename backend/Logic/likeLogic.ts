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
  const userResult: { likedVacations: string }[] = await dal_mysql.execute(
    userSql,
    [userId]
  );
  const currentLikedVacations: number[] = userResult[0].likedVacations
    ? JSON.parse(userResult[0].likedVacations)
    : [];

  if (currentLikedVacations.includes(vacationId)) {
    // Remove the like
    console.log("Removing like from vacationId:", vacationId);
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
    console.log("Adding like to vacationId:", vacationId);

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
      SELECT vacations_list.id, vacations_list.destination
      FROM vacations.likes
      INNER JOIN vacations.vacations_list ON likes.vacationId = vacations_list.id
      WHERE likes.userId = ?  
    `;
  const result: Vacation[] = await dal_mysql.execute(sql, [userId]);
  return result;
};

const likesPerVacation = async (vacationId: number) => {
  const sql = `
      SELECT COUNT(*) as likes FROM likes
      WHERE vacationId = ?
    `;
  const result: any = await dal_mysql.execute(sql, [vacationId]);
  return result[0].likes;
};

export default { toggleLike, getLikesByUser, likesPerVacation };
