"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _app = _interopRequireDefault(require("./app"));

// Handling Uncaught Exception
process.on("uncaughtException", function (e) {
  console.log("Error: ".concat(e.message));
  console.log("Shutting down the server due to Uncaught Exception");
  process.exit(1);
}); // listen server

var port = process.env.PORT || 4000;

_app["default"].listen(port, function () {
  console.log("Server is working on http://localhost:".concat(port));
}); // Unhandled Promise Rejection


process.on("unhandledRejection", function (_ref) {
  var message = _ref.message;
  console.log("Error: ".concat(message));
  console.log("Shutting down the server due to Unhandled Promise Rejection");

  _app["default"].close(function () {
    process.exit(1);
  });
});