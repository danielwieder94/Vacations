import express from "express";
import path from "path";
import cors from "cors";
import router from "./Routes/VacationRoutes";
import userRoutes from "./Routes/UserRoutes";
import config from "./Utils/Config";
import ErrorHandler from "./Middleware/route-not-found";
import UserLogic from "./Logic/UserLogic";
import VacationLogic from "./Logic/VacationLogic";
import * as dotenv from "dotenv";
import cookieParser from "cookie-parser";
import likeRouter from "./Routes/likeRoutes";
import { createProxyMiddleware } from "http-proxy-middleware";

dotenv.config();
const server = express();
server.use(cookieParser());
server.use(
  cors({
    origin: ["http://localhost:3000", "https://vacationly-snmm.onrender.com"],
    credentials: true,
  })
);

server.use(express.json());
server.use(express.static("public"));
// const vacationsApiEndpoint =
//   process.env.VACATIONS_API_ENDPOINT ||
//   "http://localhost:4000/api/v1/vacations";
// const usersApiEndpoint =
//   process.env.USERS_API_ENDPOINT || "http://localhost:4000/api/v1/users";
// const likesApiEndpoint =
//   process.env.LIKES_API_ENDPOINT || "http://localhost:4000/api/v1/likes";
// server.use(
//   "/api/v1/vacations",
//   createProxyMiddleware({ target: vacationsApiEndpoint, changeOrigin: true })
// );
// server.use(
//   "/api/v1/users",
//   createProxyMiddleware({ target: usersApiEndpoint, changeOrigin: true })
// );
// server.use(
//   "/api/v1/likes",
//   createProxyMiddleware({ target: likesApiEndpoint, changeOrigin: true })
// );
const usersApiEndpoint = process.env.USERS_API_ENDPOINT || "";
server.use(
  "/api/v1/users",
  createProxyMiddleware({ target: usersApiEndpoint, changeOrigin: true }) ||
    userRoutes
);
console.log("usersApiEndpoint: ", process.env.USERS_API_ENDPOINT);
// server.use("/api/v1/users", userRoutes);
server.use("/api/v1/vacations", router);
// server.use("/api/v1/users", userRoutes);
server.use("/api/v1/likes", likeRouter);

// server.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "public", "index.html"));
// });

server.use("*", ErrorHandler);

UserLogic.createLikesTable();
UserLogic.createUsersTable();
VacationLogic.createVacationsTable();

server.listen(config.WebPort, () => {
  console.log(
    `Server is running on  http://${config.mySQLhost}:${config.WebPort}`
  );
});
