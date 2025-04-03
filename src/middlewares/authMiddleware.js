const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ error: "Acesso negado!" });
    next();
  };
  
  module.exports = authMiddleware;
  