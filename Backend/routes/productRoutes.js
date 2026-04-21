const express = require("express");
const router = express.Router();
const uploadProductImage = require("../config/uploadProductImage");

const {
    createProduct,
    searchProducts,
    getProductDetail,
} = require("../controllers/productController");

router.post("/", (req, res, next) => {
    uploadProductImage.single("image")(req, res, (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }

        return next();
    });
}, createProduct);
router.get("/", searchProducts);
router.get("/:id", getProductDetail);

module.exports = router;
