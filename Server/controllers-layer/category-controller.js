const express = require("express");
const categoryLogic = require("../business-logic-layer/category-logic");
const router = express.Router();
const { authenticateUser, authorizeAdmin } = require("../Middleware/verifyToken");

// TODO: edit category
//**!!TODO: ADD MIDDELWHERE IN EVRY ROUTE!!**!!
//* Route to handle GET request to retrieve all categories

router.get("/categorys", authenticateUser, async (request, response) => {
    try {
        //* Get all categories using categoryLogic
        const category = await categoryLogic.getAllCategorysAsync();
        response.status(200).send(category);
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: "Server error!" });
    }
});

//* Route to handle POST request to add a new category
router.post("/add/new/:category", async (request, response) => {
    try {
        //* Get the category data from the request body
        const category = request.body;
        const newCategory = categoryLogic.addNewCategoryAsync(category);
        response.status(200).send(newCategory);
    } catch (error) {
        console.log(error);

        response.status(500).send({ message: "Server error!" });
    }
});


module.exports = router;