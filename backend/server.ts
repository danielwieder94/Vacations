import express from "express";
import path from "path";
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
//environment variables from Render
// const vacationsApiEndpoint =
//   process.env.VACATIONS_API_ENDPOINT ||
//   "http://localhost:4000/api/v1/vacations";
// const usersApiEndpoint =
//   process.env.USERS_API_ENDPOINT || "http://localhost:4000/api/v1/users";
// const likesApiEndpoint =
//   process.env.LIKES_API_ENDPOINT || "http://localhost:4000/api/v1/likes";

server.use("/api/v1/vacations", router);
server.use("/api/v1/users", userRoutes);
server.use("/api/v1/likes", likeRouter);

server.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

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
