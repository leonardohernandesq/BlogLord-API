const express = require("express");
const UserController = require("../controllers/UserController");
const CategoryController = require("../controllers/CategoryController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// User routes
router.get("/users/all", UserController.getAll);
router.get("/users/:id", authMiddleware, UserController.getById);

router.post("/users/register", UserController.create);
router.post("/users/login", UserController.login);

router.put("/users/:id", authMiddleware, UserController.update);

router.delete("/users/:id", authMiddleware, UserController.delete);

// Category routes
router.get("/category/all", authMiddleware, CategoryController.getAll);
router.get("/category/:id", authMiddleware, CategoryController.getById);

router.post("/category/create", authMiddleware, CategoryController.create);

router.put("/category/:id", authMiddleware, CategoryController.update);

router.delete("/category/:id", authMiddleware, CategoryController.delete);

module.exports = router;
