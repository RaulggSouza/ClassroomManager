import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const usuarios = [];

const SECRET = process.env.JWT_SECRET || "raulrhuan";

class AuthController {
    static async register(req, res) {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Nome de usuário e senha são obrigatórios!" });
        }

        if (usuarios.find(user => user.username === username)) {
            return res.status(409).json({ message: "Nome de usuário já existe!" });
        }

        try {
            const hashedPassword = await bcrypt.hash(password, 10); // 10 é o salt rounds

            const newUser = {
                username,
                password: hashedPassword
            };
            usuarios.push(newUser);

            res.status(201).json({ message: "Usuário registrado com sucesso!" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erro ao registrar usuário." });
        }
    }

    static async login(req, res) {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Nome de usuário e senha são obrigatórios!" });
        }

        // Busca o usuário
        const user = usuarios.find(u => u.username === username);

        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }

        try {
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({ message: "Senha incorreta." });
            }

            const token = jwt.sign(
                { id: user.id, username: user.username },
                SECRET,
                { expiresIn: "1h" }
            );

            res.status(200).json({ message: "Login bem-sucedido!", token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erro ao fazer login." });
        }
    }
}

export default AuthController;