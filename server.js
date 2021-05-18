const express = require("express");
const alunos = require("./alunos.json");

const app = express();

app.use(express.json());

//enviar dados de um resource
app.get("/alunos", (req, res) => {
    return res.json(alunos);
});

// recebe dados para um resource
app.post("/alunos/cadastrar", (req, res) => {
    const { nome, idade} = req.body;
    const id = String(alunos.length + 1);
    const novoAluno = {
        id,
        nome,
        idade
    };
    alunos.push(novoAluno);
    return res.status(201).json(alunos);

});

// altera dados para um resource
app.put("/alunos/:id", (req, res) => {
    const { id } = req.params;
    const aluno = alunos.find(aluno => aluno.id === id);
    if (!aluno) {
        return res.status(404).json({error: "Aluno não encontrado"})
    }
    const { nome, idade } = req.body;
    aluno.nome = nome;
    aluno.idade = idade;
    res.status(200).json(aluno);
});


// deleta um resource
app.delete("/alunos/:id", (req, res) => {
    
        const { id } = req.params;
        const alunoIndex = alunos.findIndex(aluno => aluno.id === id);
        alunos.splice(alunoIndex, 1);
        return res.status(204).json(alunos)
    });





app.listen(3000, () => console.log("Servidor rodando na porta 3000"));