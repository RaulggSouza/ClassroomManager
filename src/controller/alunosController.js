import express from "express";

const app = express();
app.use(express.json());

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
        nota2: 2
    },
    {
        id: 3,
        nome: "Clotilde",
        ra: "12467",
        nota1: 1.0,
        nota2: 2.2
    }
]

function buscaAluno(id){
    return alunos.findIndex(aluno => {
        return aluno.id === Number(id);
    })
}

function calculaMedia(nota1, nota2){
    return parseFloat(((nota1+nota2)/2).toFixed(2));
}

function verificaStatus(nota1, nota2){
    return calculaMedia(nota1, nota2) >= 6 ? "aprovado" : "reprovado"
}

class AlunoController{
    static listarAlunos(req, res){
        res.status(200).json(alunos);
    }

    static cadastrarAluno(req, res){
        alunos.push(req.body);
        res.status(201).json( {"message": "Aluno cadastrado"} );
    }

    static listarAlunoPorId(req, res){    
        const index = buscaAluno(req.params.id);
        if(index === -1){
            return res.status(404).json( {"message": "Aluno não encontrado"});
        }
        res.status(200).json( alunos[index] );
    }

    static listarMedias(req, res){
        const medias = [];
        alunos.forEach(aluno => medias.push(
            {
                "nome": aluno.nome,
                "media": calculaMedia(aluno.nota1, aluno.nota2)
            }
        ))
        res.status(200).json(medias);
    }

    static listarAprovados(req, res){
        const aprovados = [];
        alunos.forEach(aluno => aprovados.push(
            {
                "nome": aluno.nome,
                "status": verificaStatus(aluno.nota1, aluno.nota2)
            }
        ))
        res.status(200).json(aprovados);
    }

    static atualizarAluno(req, res){
        const index = buscaAluno(req.params.id);
        
        if(index === -1){
            return res.status(404).json( {"message": "Aluno não encontrado"})
        }
        
        alunos[index].nome = req.body.nome;
        alunos[index].ra = req.body.ra;
        alunos[index].nota1 = req.body.nota1;
        alunos[index].nota2 = req.body.nota2;
        res.status(200).json( alunos[index] );
    }

    static removerAluno(req, res){
        const index = buscaAluno(req.params.id);
    
        if(index === -1){
            return res.status(404).json( {"message": "Aluno não encontrado"})
        }
    
        alunos.splice(index, 1);
        res.status(200).json( {"message": "Aluno deletado!"} );
    }
}

export default AlunoController;