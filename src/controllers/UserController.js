const bcrypt = require('bcrypt');
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
      const { name, email, password, confirmPassword, linkedin, github } = req.body;
      if(!name || !email || !password || !confirmPassword) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios!" });
      }

      if(password !== confirmPassword)  {
        return res.status(400).json({ error: "As senhas não coincidem!" });
      }

      encryptPassword = async (password) => {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
      }

      const password_hash = await encryptPassword(password);

      const newUser = new User({ name, email, password: password_hash, linkedin, github });
      await newUser.save();
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: "Erro ao criar usuário" });
      console.log(error)
    }
  },

  getById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ error: "Usuário não encontrado" });
      user.password = undefined;
      user.__v = undefined;
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar usuário" });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: "Email e senha são obrigatórios!" });
      }

      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ error: "Senha incorreta" });

      user.password = undefined;
      user.__v = undefined;
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Erro ao fazer login" });
    }
  },

  logout: async (req, res) => {
    try {
      // Implementar lógica de logout, se necessário
      res.json({ message: "Logout bem-sucedido" });
    } catch (error) {
      res.status(500).json({ error: "Erro ao fazer logout" });
    }
  },
};

module.exports = UserController;
