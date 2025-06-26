import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "raulrhuan";

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Token não fornecido." });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Token inválido." });
    }

    try {
        const decoded = jwt.verify(token, SECRET);
        req.user = decoded;
        next(); 
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expirado." });
        }
        res.status(401).json({ message: "Token inválido ou não autorizado." });
    }
};

export default authMiddleware;