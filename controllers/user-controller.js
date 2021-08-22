const { User } = require("../models");
const HttpError = require("../util/HttpError");

const createUser = async (req, res, next) => {
  const { firstName, lastName, email } = req.body;

  let createdUser;
  try {
    createdUser = await User.create({
      firstName,
      lastName,
      email,
    });
  } catch (err) {
    const error = new HttpError(err.message, 500);
    return next(error);
  }
  res.status(201).json(createdUser);
};

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.findAll();
  } catch (err) {
    const error = new HttpError(err.message, 500);
    return next(error);
  }
  res.status(200).json(users);
};

const getUserById = async (req, res, next) => {
  let user;

  try {
    user = await User.findOne({
      where: { _id: req.params.id },
      include: "products",
    });
  } catch (err) {
    const error = new HttpError(err.message, 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError("User with this id does not exists.", 500);
    return next(error);
  }
  res.status(200).json(user);
};

const updateUserById = async (req, res, next) => {
  let updatedUser;

  try {
    updatedUser = await User.findOne({
      where: { _id: req.params.id },
    });
  } catch (err) {
    const error = new HttpError(err.message, 500);
    return next(error);
  }

  if (!updatedUser) {
    const error = new HttpError("User with this id does not exists.", 500);
    return next(error);
  }

  const { firstName, lastName, email } = req.body;

  updatedUser.firstName = firstName;
  updatedUser.lastName = lastName;
  updatedUser.email = email;

  try {
    await updatedUser.save();
  } catch (err) {
    const error = new HttpError(err.message, 500);
    return next(error);
  }

  res.status(200).json(updatedUser);
};

const deleteUserById = async (req, res, next) => {
  let deletedUser;

  try {
    deletedUser = await User.findOne({ where: { _id: req.params.id } });
  } catch (err) {
    const error = new HttpError(err.message, 500);
    return next(error);
  }

  if (!deletedUser) {
    const error = new HttpError("Product with this id does not exists.", 500);
    return next(error);
  }

  try {
    await deletedUser.destroy();
  } catch (err) {
    const error = new HttpError(err.message, 500);
    return next(error);
  }

  res.status(200).json({ message: "User has been deleted." });
};

exports.createUser = createUser;
exports.getUsers = getUsers;
exports.getUserById = getUserById;
exports.updateUserById = updateUserById;
exports.deleteUserById = deleteUserById;
