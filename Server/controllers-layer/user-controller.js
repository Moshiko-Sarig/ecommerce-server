
//*Importing necessary modules
const bcrypt = require('bcryptjs');
const express = require("express");
const router = express.Router();
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const userLogic = require("../business-logic-layer/user-logic");
const Credentials = require('../Middleware/Credentials');

dotenv.config();

//* POST route to handle new user register to the data base 
router.post("/register", async (request, response) => {
    try {
        //*Hash the password 
        const user = request.body;
        const salt = await bcrypt.genSalt(10);
        user.user_password = await bcrypt.hash(user.user_password, salt);

        //*Sending the new user to the data base 
        const newUser = await userLogic.creatNewUserAsync(user);
        response.send(newUser);
    }
    catch (error) {
        response.status(400);
        console.log(error);
    }
});

//* POST route to handle user login
router.post("/login", async (request, response) => {
    try {
        //* Extracting the credentials from the request body
        const credentials = new Credentials(request.body);

        //* Validating the received credentials
        const errors = credentials.validate();
        if (errors) return response.status(400).send(errors);

        //* Fetching the user from the database using the loginAsync function
        const user = await userLogic.loginAsync(credentials);
        //* Checking if the user exists in the database
        if (!user) return response.status(401).send("Incorrect username or password.");

        //* Generating a JWT token for the logged-in user
        const token = jwt.sign({ user }, process.env.TOKEN_SECRET, { expiresIn: "30min" });

        //* Setting the auth-token header in the response and sending the token
        response.header('auth-token', token).send(token);

    } catch (error) {
        //* Handling any errors that might occur during the process
        response.status(500).send(error.message);
        console.log(error);
    }
});





module.exports = router;