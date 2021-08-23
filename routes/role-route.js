const express = require("express");

const {
  createRole,
  getRoles,
  getRoleById,
  updateRoleById,
  deleteRoleById,
} = require("../controllers/role-controller");

const router = express.Router();

router.post("/", createRole);

router.get("/", getRoles);

router.get("/:id", getRoleById);

router.patch("/:id", updateRoleById);

router.delete("/:id", deleteRoleById);

module.exports = router;
