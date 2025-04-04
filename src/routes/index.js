const express = require("express");
const UserController = require("../controllers/UserController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/users", authMiddleware, UserController.getAll);
router.get("/users/:id", authMiddleware, UserController.getById);

router.post("/users/register", UserController.create);
router.post("/users/login", UserController.login);

router.put("/users/:id", authMiddleware, UserController.update);
router.delete("/users/:id", authMiddleware, UserController.delete);

module.exports = router;
