const express = require("express");
const UserController = require("../controllers/UserController");

const router = express.Router();

router.get("/users", UserController.getAll);
router.get("/users/:id", UserController.getById);

router.post("/users", UserController.create);
router.post("/users/login", UserController.login);
router.post("/users/logout", UserController.logout);

module.exports = router;
