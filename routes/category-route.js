const express = require("express");

const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
} = require("../controllers/category-controller");

const router = express.Router();

router.post("/", createCategory);

router.get("/", getCategories);

router.get("/:id", getCategoryById);

router.patch("/:id", updateCategoryById);

router.delete("/:id", deleteCategoryById);

module.exports = router;
