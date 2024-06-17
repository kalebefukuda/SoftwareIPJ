import express from 'express';
import MembroController from '../src/controllers/MembroController.js';

const router = express.Router();

// Padrão restFul
// Dessa forma, quando você envia uma solicitação POST para /membros, o servidor sabe que deve chamar
// o handler inserirMembro, e quando envia uma solicitação GET para /membros, ele sabe que deve chamar o handler listarTodos.

// Rota para inserir um novo membro
router.post('/membros', (req, res) => {
    MembroController.inserirMembro(req, res);
});

// Rota para listar todos os membros
router.get('/membros', (req, res) => {
    MembroController.listarTodos(res);
});

module.exports = router;

const app = express()

app.get("/", function(req,res){
    res.sendFile(__dirname + "../src/views/pages/Login.html")
})

app.get("/home", function(req,res){
    res.sendFile(__dirname + "../src/views/pages/Home.html")
})

app.get("/cadastro", function(req,res){
    res.sendFile(__dirname + "../src/views/pages/CadastroMembro.html")
})

app.get("/membros", function(req,res){
    res.sendFile(__dirname + "../src/views/pages/Membro.html")
})

app.get("/cadastroSociedade", function(req,res){
    res.sendFile(__dirname + "../src/views/pages/CadastradoSociedade.html")
})