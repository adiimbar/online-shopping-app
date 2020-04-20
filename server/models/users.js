const Joi = require("joi");

class User {
    constructor(userName, password, firstName, lastName) {
        this.userName = userName;
        this.password = password;
        this.firstName - firstName;
        this.lastName = lastName;
    }

    static validate(userToValidate) {

        const validationSchema = {
            userName: Joi.string().email().required(),
            password: Joi.string().required(), // .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/),
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            identification: Joi.number().optional(),
            city: Joi.string().optional(),
            street: Joi.string().optional()

        };

        const error = Joi.validate(
            userToValidate, validationSchema, { abortEarly: false }).error;



        if (error) { // אם היתה שגיאה אחת או יותר
            // החזרת הודעות השגיאה בלבד
            return error.details.map(err => err.message);
        }

        // אם לא היתה שגיאה
        return null;
    }
}

module.exports = User;
