const express = require("express");
const UserController = require("../controllers/UserController");

const router = express.Router();

router.get("/users", UserController.getAll);
router.post("/users", UserController.create);

module.exports = router;
