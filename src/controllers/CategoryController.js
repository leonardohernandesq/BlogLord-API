const CategoryModel = require('../models/CategoryModel');

const CategoryController = {
    getAll: async (req, res) => {
        try {
            const categories = await CategoryModel.find();
            res.json(categories);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar categorias" });
        }
    },

    create: async (req, res) => {
        try {
            const { name } = req.body;
            if (!name) {
                return res.status(400).json({ error: "Nome da categoria é obrigatório!" });
            }

            const newCategory = new CategoryModel({ name });
            await newCategory.save();
            res.status(201).json(newCategory);
        } catch (error) {
            res.status(500).json({ error: "Erro ao criar categoria" });
        }
    },

    getById: async (req, res) => {
        try {
            const category = await CategoryModel.findById(req.params.id);
            if (!category) return res.status(404).json({ error: "Categoria não encontrada" });
            res.json(category);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar categoria" });
        }
    },

    update: async (req, res) => {
        try {
            const { name } = req.body;
            if (!name) {
                return res.status(400).json({ error: "Nome da categoria é obrigatório!" });
            }

            const category = await CategoryModel.findByIdAndUpdate(req.params.id, { name }, { new: true });
            if (!category) return res.status(404).json({ error: "Categoria não encontrada" });
            res.json(category);
        } catch (error) {
            res.status(500).json({ error: "Erro ao atualizar categoria" });
        }
    },

    delete: async (req, res) => {
        try {
            const category = await CategoryModel.findByIdAndDelete(req.params.id);
            if (!category) return res.status(404).json({ error: "Categoria não encontrada" });

            // Deletar todos os posts associados a esta categoria
            await PostModel.deleteMany({ categories: req.params.id });

            res.json({ message: "Categoria deletada com sucesso!" });
        } catch (error) {
            res.status(500).json({ error: "Erro ao deletar categoria" });
        }
    }
}

module.exports = CategoryController;
