const express = require("express");
const server = express();
const fs = require("fs");
const cors = require("cors");


// const port = process.env.PORT || 3000;
// const path = require('path');

// const config = require('./config.json');
// const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const uuid = require("uuid");
const fileUpload = require("express-fileupload");

// const usersCache = new Map();

const errorHandler = require('./middleware/error-handler');
const loginFilter = require('./middleware/login-filter');

const usersController = require("./controllers/users-controller");
const ordersController = require("./controllers/orders-controller");
const productsController = require("./controllers/products-controller");
const cartsController = require("./controllers/carts-controller");
const cartItemsController = require("./controllers/cartItems-controller");
const categoriesController = require("./controllers/categories-controller");
// const imagesController = require("./controllers/images-controller");


if (!fs.existsSync("./uploads")) { // create "/uploads" folder if not exist.
    fs.mkdirSync("./uploads");
}


server.use(express.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(cors());
server.use(fileUpload());
server.use(express.json());
let nextID = 1;


// server.use(loginFilter());
server.use(errorHandler);

server.use("/users", usersController);
server.use("/orders", ordersController);
server.use("/products", productsController);
server.use("/carts", cartsController);
server.use("/cartItems", cartItemsController);
server.use("/categories", categoriesController);
// server.use("/files", imagesController);


// get image
server.get("/uploads/:name", (request, response)=>{       
    // Extracting the filename
    let fileName = request.params.name;

    // console.log(fileName);
    // console.log(__dirname);

    let fullQualifiedFileName = __dirname + "/uploads/"+fileName;
    
    response.sendFile(fullQualifiedFileName);
})

// upload image
server.post("/file", (request, response) => {
    try {      

        // Extract the uploaded image
        // IMPORTANT - The "image" property is implanted by the "express-fileupload"
        // middleware
        const file = request.files.file;

        // Extracting the uploaded file's extension (e.g. yossi.png or yossi.zip)
        const extension = file.name.substr(file.name.lastIndexOf("."));
     
        // Generating a unique identifier for each file
        let newUuidFileName = uuid.v4();

        let newFileName = newUuidFileName + extension;
        
        // we move the file into the uploads directory
        file.mv("./uploads/" + newFileName);
        
        let successfulUploadResponse = {name:newFileName};
        // console.log(successfulUploadResponse);

        // returning the product object
        response.status(200).json(successfulUploadResponse);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});


server.listen(3000, () => console.log("Listening on http://localhost:3000"));
