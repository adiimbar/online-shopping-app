const express = require("express");
const usersController = require("./controllers/users-controller");
const ordersController = require("./controllers/orders-controller");
const productsController = require("./controllers/products-controller");
const cartsController = require("./controllers/carts-controller");
const cartItemsController = require("./controllers/cartItems-controller");
const categoriesController = require("./controllers/categories-controller");

const server = express();



server.use(express.json());

server.use("/users", usersController);
server.use("/orders", ordersController);
server.use("/products", productsController);
server.use("/carts", cartsController);
server.use("/cartItems", cartItemsController);
server.use("/categories", categoriesController);

server.listen(3000, () => console.log("Listening on http://localhost:3000"));

