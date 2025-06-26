import express from "express";
import AlunoController from "../controller/alunosController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const routes = express.Router();

routes.use(authMiddleware);

routes.get("/alunos", AlunoController.listarAlunos);
routes.get("/alunos/medias", AlunoController.listarMedias);
routes.get("/alunos/aprovados", AlunoController.listarAprovados);
routes.get("/alunos/:id", AlunoController.listarAlunoPorId);
routes.post("/alunos", AlunoController.cadastrarAluno);
routes.put("/alunos/:id",AlunoController.atualizarAluno);
routes.delete("/alunos/:id",AlunoController.removerAluno);

export default routes;