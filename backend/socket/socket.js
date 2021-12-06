import { Server } from "socket.io";

const { addUser, getUsersInrrom, removeUser } = require("./actions");

export function socket(server) {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
    maxHttpBufferSize: 1e9,
  });
  io.on("connection", (socket) => {
    console.log("connection created");
    const { room, name } = socket.handshake.query;
    const { user } = addUser({ id: socket.id, name, room });
    socket.join(user.room);
    io.in(user.room).emit("allUsers", {
      room: user.room,
      users: getUsersInrrom(user.room),
    });
    //   listen for new message
    socket.on("send messages", (message) => {
      io.in(user.room).emit("send messages", message);
    });
    //   listen typing events
    socket.on("start typing message", (data) => {
      io.in(user.room).emit("start typing message", data);
    });
    socket.on("stop typing message", (data) => {
      io.in(user.room).emit("stop typing message", data);
    });
    //   remove user for disconnecter
    socket.on("disconnect", () => {
      console.log(`${socket.id} left chat!`);
      removeUser(socket.id);
      io.in(user.room).emit("user leave chat", user);
      socket.leave(user.room);
    });
  });
}
