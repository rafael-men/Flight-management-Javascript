const jwt = require('jsonwebtoken')
require("dotenv").config()

const authMiddleware = (req, res, next) => {
    const authHeader = req.header("Authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Acesso negado. Token não fornecido ou formato inválido." })
    }

    const token = authHeader.replace("Bearer ", "").trim()

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded;
        next()
    } catch (err) {
        return res.status(403).json({ error: "Token inválido ou expirado." })
    }
};

module.exports = authMiddleware
