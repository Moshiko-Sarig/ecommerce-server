// TODO : nedd to add new cart by user id and get cart by user id 
const dal = require('../data-access-layer/dal');

async function getCartByUserIdAsync(user_id) {
    try {
        return await dal.executeQueryAsync(`SELECT * FROM shopping_cart WHERE user_id="${user_id}"`);
    }
    catch (error) {
        console.log(error);
    }
}

async function sendNewCartByUserIdAsync(user_id) {
    try {

    }

    catch (error) {
        console.log(error);
    }
}


async function deleteCartByUserID(user_id) {
    try {

    }

    catch (error) {
        console.log(error);
    }
}


module.exports = {

}