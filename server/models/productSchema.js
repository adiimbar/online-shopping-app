const Joi = require('joi');

const productSchema = {

    addProduct: {
        productName: Joi.string()
        .required(),
  
        category: Joi.number()
        .required(),
  
        productPrice: Joi.number()
        .required(),
  
        productImage: Joi.string()
        .required()
    },
    // need to adjust
    updateProduct: {
        productName: Joi.string()
        .required(),
  
        category: Joi.number()
        .required(),
  
        productPrice: Joi.number()
        .required(),
  
        productImage: Joi.string()
        .required()
    },
    getProductByName: {
        productName: Joi.string()
        .regex(/^[a-zA-Z]{1,20}$/)
        .required()
    }



};

module.exports = productSchema;