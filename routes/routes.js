import express from 'express';

const router = express.Router();

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