//need to take the product and add it to the cart of the user 
//need to delete the product from the list 
// need to edit the amount of the product 

const dal = require("../data-access-layer/dal");

async function getAllCartItem() {
    try {
        return await dal.executeQueryAsync(`SELECT * FROM cart_item WHERE 1`);
    }
    catch (error) {
        console.log(error);

    }
}

async function getCartItemById(cart_id) {
    try {
        return await dal.executeQueryAsync(`SELECT * FROM cart_item WHERE cart_id ="${cart_id}"`);
    }
    catch (error) {
        console.log(error);
    }
}


module.exports = {
    getAllCartItem,
    getCartItemById,

}
