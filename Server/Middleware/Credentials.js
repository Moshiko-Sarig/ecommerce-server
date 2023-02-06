const Joi = require("joi");

//* Class for handling user credentials
class Credentials {
    //* Constructor to store user email and password as instance variables
    constructor(credentials) {
        this.user_email = credentials.user_email;
        this.user_password = credentials.user_password;
    }

    //* Static property to store the validation schema using Joi
    static #validationSchema = Joi.object({
        user_email: Joi.string().required().min(4).max(90),
        user_password: Joi.string().required().min(3).max(225)
    });

    //* Method to validate the instance against the validation schema
    validate() {
        const result = Credentials.#validationSchema.validate(this, { abortEarly: false });
        //* Return the error messages if there are any, otherwise return null
        return result.error ? result.error.details.map(err => err.message) : null;
    }
}

//* Export the Credentials class for use in other modules
module.exports = Credentials;
