const dal = require('../data-access-layer/dal');

//* Get all categories from the database
async function getAllCategorysAsync() {
    try {
        //* Execute query to retrieve all categories
        return await dal.executeQueryAsync(`SELECT * FROM product_category WHERE 1`);
    } catch (error) {

        console.log(error);
    }
}

//* Add a new category to the database
async function addNewCategoryAsync(category_name) {
    try {
        //* Execute query to insert new category
        return await dal.executeQueryAsync(`INSERT INTO product_category(category_id, category_name) VALUES(NULL, '${category_name}')`);
    } catch (error) {

        console.log(error);
    }
}

//* Export functions
module.exports = {
    getAllCategorysAsync,
    addNewCategoryAsync
};