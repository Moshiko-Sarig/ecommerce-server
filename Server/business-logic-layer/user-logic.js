//*Importing necessary modules
const bcrypt = require('bcryptjs');
const dal = require('../data-access-layer/dal');

async function creatNewUserAsync(user) {
    try {
        //* Check if user id exists in the database
        const userIdExists = await dal.executeQueryAsync(`
             SELECT user_id 
             FROM user 
             WHERE user_id = "${user.user_id}"
         `);
        if (userIdExists.length > 0) {
            return { error: 'id already exists' };
        }

        //* Check if email exists in the database
        const emailExists = await dal.executeQueryAsync(`
            SELECT user_email 
            FROM user 
            WHERE user_email = "${user.user_email}"
        `);
        if (emailExists.length > 0) {
            return { error: 'Email already exists' };
        }

        //* Insert new user into the database
        return await dal.executeQueryAsync(`
            INSERT INTO user 
            (user_id , user_first_name , user_last_name, user_email, user_password, user_city , user_street , user_is_admin)
            VALUES 
            ("${user.user_id}","${user.user_first_name}", "${user.user_last_name}", "${user.user_email}", "${user.user_password}", "${user.user_city}", "${user.user_street}" , "${user.user_is_admin = 0}" )
        `);
    }
    catch (error) {
        console.log(error);
    }
}


async function loginAsync(credentials) {
    try {
        //* Select the user with the given email from the database
        const user = await dal.executeQueryAsync(
            `SELECT * from user where user_email = '${credentials.user_email}'`
        );

        //* If the user was not found or there was an error, return null
        if (!user || user.length < 1) return null;

        //* Get the hashed password stored in the database for the user
        const hashedPassword = user[0].user_password;

        //* Compare the given password with the hashed password using bcrypt
        const isPasswordMatch = await bcrypt.compare(credentials.user_password, hashedPassword);

        //* If the passwords don't match, return null
        if (!isPasswordMatch) return null;

        //* Return the user object without the password
        delete user[0].user_password;
        return user[0];

    } catch (error) {
        console.log(error);
    }
}






module.exports = {
    creatNewUserAsync,
    loginAsync,

}