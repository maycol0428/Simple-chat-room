"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _http = require("http");

var _dotenv = _interopRequireDefault(require("dotenv"));

var _path = _interopRequireDefault(require("path"));

var _error = _interopRequireDefault(require("./middleware/error"));

var _cors = _interopRequireDefault(require("cors"));

var _actions = require("./socket/actions");

var _socket = require("socket.io");

var _socket2 = require("./socket/socket");

_dotenv["default"].config();

var app = (0, _express["default"])();
app.use((0, _cors["default"])());
app.use(_express["default"]["static"](_path["default"].join(__dirname, "../frontend/build")));
app.get("*", function (req, res) {
  res.sendFile(_path["default"].resolve(__dirname, "../frontend/build/index.html"));
}); // Middlewares for errors

app.use(_error["default"]);
var server = (0, _http.createServer)(app);
(0, _socket2.socket)(server);
var _default = server;
exports["default"] = _default;