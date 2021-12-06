"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.users = exports.removeUser = exports.getUsersInrrom = exports.addUser = void 0;
var users = [];
exports.users = users;

var addUser = function addUser(_ref) {
  var id = _ref.id,
      room = _ref.room,
      name = _ref.name;
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();
  var existingUser = users.find(function (user) {
    return user.room !== room && user.name === name;
  });

  if (!name || !room) {
    return {
      error: "Username and Room are required"
    };
  }

  if (existingUser) {
    return {
      error: "Username is already taken"
    };
  }

  var user = {
    id: id,
    room: room,
    name: name
  };
  users.push(user);
  return {
    user: user
  };
};

exports.addUser = addUser;

var removeUser = function removeUser(id) {
  var index = users.findIndex(function (user) {
    return user.id === id;
  });

  if (index !== -1) {
    users.splice(index, 1);
  }
};

exports.removeUser = removeUser;

var getUsersInrrom = function getUsersInrrom(room) {
  return users.filter(function (user) {
    return user.room === room;
  });
};

exports.getUsersInrrom = getUsersInrrom;