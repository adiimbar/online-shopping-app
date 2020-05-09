// const User = require("../models/user");
// const Order = require("../models/order");
// const Product = require("../models/product");
// const CartItem = require("../models/cartItem");
// const Cart = require("../models/cart");
// const Category = require("../models/category");
let ErrorType = require("../errors/error-type");
let ServerError = require("../errors/server-error");

const userSchemas = require('../models/userSchema');
const middleware = require('../middleware/Joi-middlewere');


// // Validate the object's length:
// async function isValid(object) {
//     if (object.length === 0) {
//         throw new ServerError(ErrorType.GENERAL_ERROR);
//     };
// };

// User to validate:
async function userLoginValidation(user) {
    const errorDetails =  middleware(userSchemas.login, user);
    // console.log(errorDetails);
    if (errorDetails) {
        throw new Error("Invalid details");
    }
}

async function userRegistrationValidation(user) {
    const errorDetails =  middleware(userSchemas.registration, user);
    // console.log(errorDetails);
    if (errorDetails) {
        throw new Error("Invalid details");
    }
}


// // Is int valid: works
// async function isIntValid(moduleName) {
//     const intToValidate = await moduleName;
//     if (intToValidate.length === 0) {
//         throw new Error("No existing match in data base.");
//     };
//     return;
// };

// async function cartItemtValidation(item) {
//     const errorDetails = CartItem.validate(item);
//     if (errorDetails) {
//         throw new Error("Invalid item details (logic)");
//     };
//     return;
// };



// function validateId(id) {
//     if (id == 0) {
//         throw new Error("invalid id")
//     }
// }
// // Item to validate:
// async function productValidtation(product) {
//     const errorDetails = Product.validate(product);
//     if (errorDetails) {
//         throw new Error("Invalid item details (items_logic)");
//     };
// };

// //Category to validate:
// function validateCategory(category) {
//     // Validate the category to add:
//     const errorDetails = Category.validate(category);
//     if (errorDetails) {
//         throw new Error("invalid category")
//     }
// }




// // Cart to validate:
// async function cartValidation(cart) {
//     const errorDetails = Cart.validate(cart);
//     if (errorDetails) {
//         throw new Error("Invalid cart details (carts_logic)");
//     };
// };
// async function orderValidation(order) {
//     const errorDetails = Order.validate(order);
//     if (errorDetails) {
//         throw new Error("Invalid purchase details (logic)");
//     };
// };
// async function cartValidation(cart) {
//     const errorDetails = Cart.validate(cart);
//     if (errorDetails) {
//         throw new Error("Invalid cart details (logic)");
//     };
// };


module.exports = {
    // isValid,
    userLoginValidation,
    userRegistrationValidation
    // isIntValid,
    // cartValidation,
    // orderValidation,
    // productValidtation,
    // cartValidation,
    // cartItemtValidation,
    // validateId,
    // validateCategory
};





// function validResponse(object) {
//     if (object.length == 0) {
//         throw new Error("error");
//     }
// }

// function validateId(id) {
//     if (id == 0) {
//         throw new Error("invalid id")
//     }
// }

// module.exports = {
//     validResponse,
//     validateId
// }
