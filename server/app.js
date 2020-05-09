const express = require("express");
const server = express();

// const port = process.env.PORT || 3000;
// const path = require('path');

// const config = require('./config.json');
// const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

// const usersCache = new Map();

const errorHandler = require('./middleware/error-handler');
const loginFilter = require('./middleware/login-filter');

const usersController = require("./controllers/users-controller");
const ordersController = require("./controllers/orders-controller");
const productsController = require("./controllers/products-controller");
const cartsController = require("./controllers/carts-controller");
const cartItemsController = require("./controllers/cartItems-controller");
const categoriesController = require("./controllers/categories-controller");


server.use(express.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

// server.use(loginFilter());
server.use(errorHandler);

server.use("/users", usersController);
server.use("/orders", ordersController);
server.use("/products", productsController);
server.use("/carts", cartsController);
server.use("/cartItems", cartItemsController);
server.use("/categories", categoriesController);

server.listen(3000, () => console.log("Listening on http://localhost:3000"));
