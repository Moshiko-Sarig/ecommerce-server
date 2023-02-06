//cerat new order , get all orders?

const dal = require('../data-access-layer/dal');


async function creatNewOrderAsync() {//send new order to the db
    try {

    }

    catch (error) {
        console.log(error);
    }
}

async function getAllOrdersAsync() {// get all the orders from the db 
    try {

    }
    catch (erorr) {
        console.log(erorr);
    }
}


module.exports = {
    creatNewOrderAsync,
    getAllOrdersAsync
}