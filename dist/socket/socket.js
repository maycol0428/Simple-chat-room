"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.socket = socket;

var _socket = require("socket.io");

var _require = require("./actions"),
    addUser = _require.addUser,
    getUsersInrrom = _require.getUsersInrrom,
    removeUser = _require.removeUser;

function socket(server) {
  var io = new _socket.Server(server, {
    cors: {
      origin: "*"
    },
    maxHttpBufferSize: 1e9
  });
  io.on("connection", function (socket) {
    console.log("connection created");
    var _socket$handshake$que = socket.handshake.query,
        room = _socket$handshake$que.room,
        name = _socket$handshake$que.name;

    var _addUser = addUser({
      id: socket.id,
      name: name,
      room: room
    }),
        user = _addUser.user;

    socket.join(user.room);
    io["in"](user.room).emit("allUsers", {
      room: user.room,
      users: getUsersInrrom(user.room)
    }); //   listen for new message

    socket.on("send messages", function (message) {
      io["in"](user.room).emit("send messages", message);
    }); //   listen typing events

    socket.on("start typing message", function (data) {
      io["in"](user.room).emit("start typing message", data);
    });
    socket.on("stop typing message", function (data) {
      io["in"](user.room).emit("stop typing message", data);
    }); //   remove user for disconnecter

    socket.on("disconnect", function () {
      console.log("".concat(socket.id, " left chat!"));
      removeUser(socket.id);
      io["in"](user.room).emit("user leave chat", user);
      socket.leave(user.room);
    });
  });
}