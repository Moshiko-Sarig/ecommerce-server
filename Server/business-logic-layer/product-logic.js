//edit(put), post is missing!
const dal = require('../data-access-layer/dal');

async function getAllProductsAsync() {//get all the products
    try {
        return await dal.executeQueryAsync(`SELECT * FROM product WHERE 1`);
    }
    catch (error) {
        console.log(error);
    }
}

async function getProductByCategoryAsync(category_id) {//get product by the category id 
    try {
        return await dal.executeQueryAsync(`
        SELECT * FROM product WHERE category_id =${category_id}`);
    }
    catch (error) {
        console.log(error);
    }
}

async function getProductByNameAsync(product_name) {//get req for the serch prodcut bar 
    try {
        return await dal.executeQueryAsync(`
        SELECT * FROM product WHERE product_name LIKE CONCAT('%', "${product_name}", '%')`);
    }
    catch (error) {
        console.log(error);
    }
}


async function creatNewProductAsync(product) {//send new product to the db
    try {


    }
    catch (error) {
        console.log(error);
    }
}

async function editProductAsync(product) {
    try {


    }
    catch (error) {
        console.log(error);
    }
}


module.exports = {
    getProductByCategoryAsync,
    getProductByNameAsync,
    getAllProductsAsync,
    creatNewProductAsync,
    editProductAsync
}