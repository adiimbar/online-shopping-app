const express = require("express");
const usersController = require("./controllers/users-controller");
const server = express();

// Extract the JSON from the body and create request.body object containing it: 
server.use(express.json());

server.use("/users", usersController);
// server.use("/api/employees", employeesController);
// server.use("/api/cats", catsController);

server.listen(3000, () => console.log("Listening on http://localhost:3000"));

