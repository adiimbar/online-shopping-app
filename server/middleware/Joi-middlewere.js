const Joi = require('joi');

const middleware = (schema, property) => {
  // console.log(schema);
  // console.log(property);

  const error = Joi.validate(
    property, schema, { abortEarly: false }).error;

  if (error) { // אם היתה שגיאה אחת או יותר
      // החזרת הודעות השגיאה בלבד
      return error.details.map(err => err.message);
  }

  // אם לא היתה שגיאה
  return null;






  // return (req, res, next) => {

  //   const { error } = Joi.validate(req[property], schema);

  //   const valid = error == null;
  //   if (valid) {
  //     next();
  //   } else {
      
  //     const { details } = error;
  //     const message = details.map(i => i.message).join(',');
  //     console.log("error", message);

  //     res.status(422).json({
  //       error: message 
  //     })
  //   }
  // }
}

module.exports = middleware;