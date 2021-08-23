const { Role } = require("../models");
const HttpError = require("../util/HttpError");

const createRole = async (req, res, next) => {
  const { name, description } = req.body;

  let createdRole;
  try {
    createdRole = await Role.create({
      name,
      description,
    });
  } catch (err) {
    const error = new HttpError(err.message, 500);
    return next(error);
  }
  res.status(201).json(createdRole);
};

const getRoles = async (req, res, next) => {
  let roles;
  try {
    roles = await Role.findAll();
  } catch (err) {
    const error = new HttpError(err.message, 500);
    return next(error);
  }
  res.status(200).json(roles);
};

const getRoleById = async (req, res, next) => {
  let role;

  try {
    role = await Role.findOne({
      where: { _id: req.params.id },
      include: "users",
    });
  } catch (err) {
    const error = new HttpError(err.message, 500);
    return next(error);
  }

  if (!role) {
    const error = new HttpError("Role with this id does not exists.", 500);
    return next(error);
  }
  res.status(200).json(role);
};

const updateRoleById = async (req, res, next) => {
  let updatedRole;

  try {
    updatedRole = await Role.findOne({
      where: { _id: req.params.id },
    });
  } catch (err) {
    const error = new HttpError(err.message, 500);
    return next(error);
  }

  if (!updatedRole) {
    const error = new HttpError("Role with this id does not exists.", 500);
    return next(error);
  }

  const { name, description } = req.body;

  updatedRole.name = name;
  updatedRole.description = description;

  try {
    await updatedRole.save();
  } catch (err) {
    const error = new HttpError(err.message, 500);
    return next(error);
  }

  res.status(200).json(updatedRole);
};

const deleteRoleById = async (req, res, next) => {
  let deletedRole;

  try {
    deletedRole = await Role.findOne({ where: { _id: req.params.id } });
  } catch (err) {
    const error = new HttpError(err.message, 500);
    return next(error);
  }

  if (!deletedRole) {
    const error = new HttpError("Role with this id does not exists.", 500);
    return next(error);
  }

  try {
    await deletedRole.destroy();
  } catch (err) {
    const error = new HttpError(err.message, 500);
    return next(error);
  }

  res.status(200).json({ message: "Role has been deleted." });
};

exports.createRole = createRole;
exports.getRoles = getRoles;
exports.getRoleById = getRoleById;
exports.updateRoleById = updateRoleById;
exports.deleteRoleById = deleteRoleById;
