const express = require("express");
const router = express.Router();
const uploadProductImage = require("../config/uploadProductImage");

const {
    createProduct,
    updateProduct,
    searchProducts,
    getProductDetail,
} = require("../controllers/productController");

function handleSingleProductImageUpload(req, res, next) {
    uploadProductImage.single("image")(req, res, (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }

        return next();
    });
}

router.post("/", handleSingleProductImageUpload, createProduct);
router.put("/:id", handleSingleProductImageUpload, updateProduct);
router.get("/", searchProducts);
router.get("/:id", getProductDetail);

module.exports = router;
