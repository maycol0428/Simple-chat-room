import server from "./app";
// Handling Uncaught Exception
process.on("uncaughtException", (e) => {
  console.log(`Error: ${e.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

// listen server
const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log(`Server is working on http://localhost:${port}`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", ({ message }) => {
  console.log(`Error: ${message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);
  server.close(() => {
    process.exit(1);
  });
});
