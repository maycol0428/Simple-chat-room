import express from "express";
import { createServer } from "http";
import dotenv from "dotenv";
import path from "path";
import errorMiddleware from "./middleware/error";
import cors from "cors";
import { addUser, getUsersInrrom, removeUser } from "./socket/actions";
import { Server } from "socket.io";
import { socket } from "./socket/socket";
dotenv.config();
const app = express();

app.use(cors());

app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

// Middlewares for errors
app.use(errorMiddleware);

const server = createServer(app);
socket(server);

export default server;
