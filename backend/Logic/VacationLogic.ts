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

//edit vacation

//delete vacation

//get all vacations

//get vacation by id

//get vacations by destination

export default { createVacationsTable };
