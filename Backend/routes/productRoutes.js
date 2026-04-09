const express = require("express");
const router = express.Router();

const {
    searchProducts,
    getProductDetail,
} = require("../controllers/productController");

router.get("/", searchProducts);
router.get("/:id", getProductDetail);

module.exports = router;
