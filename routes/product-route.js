const express = require("express");
const {
  getProducts,
  createProduct,
  getProductById,
  updateProductById,
  deleteProductById,
} = require("../controllers/product-controller");

const router = express.Router();

router.post("/", createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.patch("/:id", updateProductById);
router.delete("/:id", deleteProductById);

module.exports = router;
