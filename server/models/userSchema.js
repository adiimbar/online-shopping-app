const Joi = require('joi');

const identificationNumberLength = 9;

const userSchemas = {

  login: {
    email: Joi.string()
      .email()
      // .regex(RegExp('^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'))
      // // .pattern(new RegExp('^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'))
      .required(),

    password: Joi.string()
      // .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
      .required(), // .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/),
  },
  registration: {
    identificationNumber: Joi.string()
      // Joi.number()
      // need to be a number
      // .min(identificationNumberLength)
      // .max(identificationNumberLength)
      .length(identificationNumberLength)
      .required(),

    email: Joi.string()
      .email()
      .regex(/^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)$/)
      
      // .regex(RegExp('^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'))
      // // .pattern(new RegExp('^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'))
      .required(),

    password: Joi.string()
      // .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
      .required(),


      // need to be fixed
    confirmPassword: Joi.any().valid(Joi.ref('password')).required(),
    // .ref('password'),

    city: Joi.string()
      .required(),

    street: Joi.string()
      .required(),

    firstName: Joi.string()
      .required(),

    lastName: Joi.string()
      .required()
  }

};

module.exports = userSchemas;