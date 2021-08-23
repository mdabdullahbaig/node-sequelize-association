const { Category } = require("../models");
const HttpError = require("../util/HttpError");

const createCategory = async (req, res, next) => {
  const { firstName, lastName, email, roleId } = req.body;

  let createdCategory;
  try {
    createdCategory = await Category.create({
      firstName,
      lastName,
      email,
      roleId,
    });
  } catch (err) {
    const error = new HttpError(err.message, 500);
    return next(error);
  }
  res.status(201).json(createdCategory);
};

const getCategories = async (req, res, next) => {
  let Categories;
  try {
    Categories = await Category.findAll();
  } catch (err) {
    const error = new HttpError(err.message, 500);
    return next(error);
  }
  res.status(200).json(Categories);
};

const getCategoryById = async (req, res, next) => {
  let Category;

  try {
    Category = await Category.findOne({
      where: { _id: req.params.id },
      include: ["products", "role"],
    });
  } catch (err) {
    const error = new HttpError(err.message, 500);
    return next(error);
  }

  if (!Category) {
    const error = new HttpError("Category with this id does not exists.", 500);
    return next(error);
  }
  res.status(200).json(Category);
};

const updateCategoryById = async (req, res, next) => {
  let updatedCategory;

  try {
    updatedCategory = await Category.findOne({
      where: { _id: req.params.id },
    });
  } catch (err) {
    const error = new HttpError(err.message, 500);
    return next(error);
  }

  if (!updatedCategory) {
    const error = new HttpError("Category with this id does not exists.", 500);
    return next(error);
  }

  const { firstName, lastName, email } = req.body;

  updatedCategory.firstName = firstName;
  updatedCategory.lastName = lastName;
  updatedCategory.email = email;

  try {
    await updatedCategory.save();
  } catch (err) {
    const error = new HttpError(err.message, 500);
    return next(error);
  }

  res.status(200).json(updatedCategory);
};

const deleteCategoryById = async (req, res, next) => {
  let deletedCategory;

  try {
    deletedCategory = await Category.findOne({ where: { _id: req.params.id } });
  } catch (err) {
    const error = new HttpError(err.message, 500);
    return next(error);
  }

  if (!deletedCategory) {
    const error = new HttpError("Product with this id does not exists.", 500);
    return next(error);
  }

  try {
    await deletedCategory.destroy();
  } catch (err) {
    const error = new HttpError(err.message, 500);
    return next(error);
  }

  res.status(200).json({ message: "Category has been deleted." });
};

exports.createCategory = createCategory;
exports.getCategories = getCategories;
exports.getCategoryById = getCategoryById;
exports.updateCategoryById = updateCategoryById;
exports.deleteCategoryById = deleteCategoryById;
