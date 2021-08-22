const express = require("express");

const {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("../controllers/user-controller");

const router = express.Router();

router.post("/", createUser);

router.get("/", getUsers);

router.get("/:id", getUserById);

router.patch("/:id", updateUserById);

router.delete("/:id", deleteUserById);

module.exports = router;
