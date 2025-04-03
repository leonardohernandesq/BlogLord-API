const User = require("../models/UserModel");

const UserController = {
  getAll: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar usuários" });
    }
  },

  create: async (req, res) => {
    try {
      const { name, email } = req.body;
      const newUser = new User({ name, email });
      await newUser.save();
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: "Erro ao criar usuário" });
    }
  },
};

module.exports = UserController;
