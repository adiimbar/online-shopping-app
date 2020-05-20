const Joi = require('joi');

const cartItemSchema = {

    addCartItem: {
        product_id: Joi.number()
        .required(),
  
        quantity: Joi.number()
        .required(),
  
        shopping_cart_id: Joi.number()
        .required(),  
    },
    // need to adjust
    updateCartItem: {
        quantity: Joi.number()
        .positive()
        .max(42)
        .required(),
  
        product_id: Joi.number()
        .required(),
  
        cartId: Joi.number()
        .required(),
    },
    // need to adjust
    deleteItemFromCart: {
        productId: Joi.number()
        .required(),
  
        cartId: Joi.number()
        .required(),
    },
    emptyCart: {
        cartId: Joi.number()
        .required(),
    }



};

module.exports = cartItemSchema;