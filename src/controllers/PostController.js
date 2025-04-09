const PostModel = require('../models/PostModel');
const CategoryModel = require('../models/CategoryModel');
const UserModel = require('../models/UserModel');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

const PostController = {
    getAll: async (req, res) => {
        try {
            const posts = await PostModel.find().populate('categories', 'name').populate('user', 'name');
            res.json(posts);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar posts" });
        }
    },

    getPostById: async (req, res) => {
        try {
            const post = await PostModel.findById(req.params.id).populate('categories', 'name').populate('user', 'name');
            if (!post) return res.status(404).json({ error: "Post não encontrado" });
            res.json(post);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar post" });
        }
    },

    getPostsByCategory: async (req, res) => {
        try {
            const posts = await PostModel.find({ categories: req.params.id }).populate('categories', 'name');
            res.json(posts);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar posts por categoria" });
        }
    },

    getPostsByUser: async (req, res) => {
        try {
            const posts = await PostModel.find({ user: req.params.id }).populate('user', 'name');
            res.json(posts);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar posts por usuário" });
        }
    },

    create: async (req, res) => {
        try {
            const { title, content, status } = req.body;
            const userId = req.body.user || req.user?.id;

            const categories = typeof req.body.categories === "string"
                ? JSON.parse(req.body.categories)
                : req.body.categories;

            if (!title || !content || !categories || categories.length === 0) {
                return res.status(400).json({ error: "Título, conteúdo e pelo menos uma categoria são obrigatórios!" });
            }

            for (const category of categories) {
                const categoryExists = await CategoryModel.findById(category);
                if (!categoryExists) {
                    return res.status(400).json({ error: "Categoria não encontrada!" });
                }
            }

            const userExists = await UserModel.findById(userId);
            if (!userExists) {
                return res.status(400).json({ error: "Usuário não encontrado!" });
            }

            const image = req.file?.filename;

            const newPost = new PostModel({
                title,
                content,
                categories,
                user: userId,
                status,
                image
            });

            await newPost.save();
            res.status(201).json(newPost);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao criar post" });
        }
    },

    update: async (req, res) => {
        try {
            const { title, content, status, userId } = req.body;
            const postId = req.params.id;
    
            const categories = typeof req.body.categories === "string"
                ? JSON.parse(req.body.categories)
                : req.body.categories;
    
            const post = await PostModel.findById(postId);
            console.log(post);
            if (!post) {
                return res.status(404).json({ error: "Post não encontrado!" });
            }
    
            if (post.user.toString() !== userId) {
                return res.status(403).json({ error: "Você não tem permissão para editar este post!" });
            }
    
            if (title) post.title = title;
            if (content) post.content = content;
            if (status) post.status = status;
    
            if (categories && categories.length > 0) {
                for (const category of categories) {
                    const categoryExists = await CategoryModel.findById(category);
                    if (!categoryExists) {
                        return res.status(400).json({ error: "Categoria não encontrada!" });
                    }
                }
                post.categories = categories;
            }
    
            const image = req.file?.filename;
            if (image) {
                post.image = image;
            }
    
            await post.save();
            res.status(200).json(post);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao atualizar post" });
        }
    },
    

    delete: async (req, res) => {
        try {
            const post = await PostModel.findByIdAndDelete(req.params.id);
            if (!post) return res.status(404).json({ error: "Post não encontrado" });
            res.json({ message: "Post deletado com sucesso!" });
        } catch (error) {
            res.status(500).json({ error: "Erro ao deletar post" });
        }
    },
    addView: async (req, res) => {
        try {
            const post = await PostModel.findById(req.params.id);
            if (!post) return res.status(404).json({ error: "Post não encontrado" });
            post.views += 1;
            await post.save();
            res.json(post);
        } catch (error) {
            res.status(500).json({ error: "Erro ao adicionar visualização" });
        }
    }
};   

module.exports = PostController;
