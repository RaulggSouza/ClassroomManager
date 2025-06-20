import express from "express";
import routes from "./routes/index.js";

const app = express();
routes(app);

const alunos = [
    {
        id: 1,
        nome: "Asdrubal",
        ra: "11111",
        nota1: 8.6,
        nota2: 7.3
    },
    {
        id: 2,
        nome: "Bernardette",
        ra: "23145",
        nota1: 10.0,
        nota2: 1.1
    }
]

app.delete("/alunos/:id", (req, res) => {
    const index = buscaAluno(req.params.id);
    
    if(index === -1){
        return res.status(404).json( {"message": "Aluno não encontrado"})
    }
    
    alunos.splice(index, 1);
    res.status(200).json( {"message": "Aluno deletado!"} );
})

export default app;