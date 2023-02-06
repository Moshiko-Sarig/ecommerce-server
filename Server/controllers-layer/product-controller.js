
const express = require("express");
const fileUpload = require("express-fileupload");
const router = express.Router();
const productLogic = require("../business-logic-layer/product-logic");


//*TODO: get all ,  add ,edit ,?delete?
//TODO: ADD MIDDELWHERE IN EVRY ROUTE!!

//* GET the image to the client 
router.get("/images/:imageName", (request, response) => {
    const imageName = request.params.imageName;
    let imageAddres = path.join(__dirname, "..", "images", imageName);
    if (!fs.existsSync(imageAddres)) {
        imageAddres = path.join(__dirname, "..", "images", "Error: canot find image ");

    }
    response.sendFile(imageAddres);
});

//*GET prodcut by name for the search bar
router.get("/product/byName/:name", async (request, response) => {
    try {
        const name = request.params.name;
        const product = await productLogic.getProductByNameAsync(name);
        response.send(product);
    }
    catch (error) {
        console.log(error);
        response.status(500).send({ message: "Server error!" });
    }
});

//* GET prodcut by the category for the product view 
router.get("/product/get/byId/:id", async (request, response) => {
    try {
        const id = request.params.id;
        const product = await productLogic.getProductByCategoryAsync(id);
        response.send(product);
    }
    catch (error) {
        response.status(500).send({ message: "Server error!" });
        console.log(error);
    }
});

module.exports = router;