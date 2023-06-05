import express from "express";
// import bodyParser from "body-parser";
import cors from "cors";
import router from "./Routes/VacationRoutes";
import userRoutes from "./Routes/UserRoutes";
import config from "./Utils/Config";
import ErrorHandler from "./Middleware/route-not-found";
import UserLogic from "./Logic/UserLogic";
import VacationLogic from "./Logic/VacationLogic";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import likeRouter from "./Routes/likeRoutes";

dotenv.config();
const server = express();
server.use(cookieParser());
server.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

server.use(express.json());
server.use(express.static("public"));

server.use("/api/v1/vacations", router);
server.use("/api/v1/users", userRoutes);
server.use("/api/v1/likes", likeRouter);

// console.log("check if tables exist..");

server.use("*", ErrorHandler);
// server.use(fileUpload());

UserLogic.createLikesTable();
UserLogic.createUsersTable();
VacationLogic.createVacationsTable();

server.listen(config.WebPort, () => {
  console.log(
    `Server is running on  http://${config.mySQLhost}:${config.WebPort}`
  );
});
