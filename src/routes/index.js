const express = require("express");
const UserController = require("../controllers/UserController");
const CategoryController = require("../controllers/CategoryController");
const PostController = require("../controllers/PostController");
const authMiddleware = require("../middlewares/authMiddleware");
const upload = require('../config/multer');

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

// Posts routes
router.get("/posts/all", authMiddleware, PostController.getAll);
router.get("/posts/:id", authMiddleware, PostController.getPostById);
router.get("/posts/category/:id", authMiddleware, PostController.getPostsByCategory);
router.get("/posts/user/:id", authMiddleware, PostController.getPostsByUser);

router.post("/posts/create", authMiddleware, upload.single("image"), PostController.create);

router.put("/posts/:id", authMiddleware, PostController.update);

router.delete("/posts/:id", authMiddleware, PostController.delete);

module.exports = router;
