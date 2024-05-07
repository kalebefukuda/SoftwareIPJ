const express = require('express');
const app = express();
const path = require('path');

// Configurando o middleware para servir arquivos estáticos do diretório 'app/views'
app.use(express.static(path.join(__dirname, 'app/views')));

// Definindo a rota para a página inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'app/views/pages/Login.html'));
});

// Definindo a rota para a página Home
app.get("/home", (req, res) => {
    res.sendFile(path.join(__dirname, "app/views/pages/Home.html"));
});

app.get("/relatorios", (req, res) => {
    res.sendFile(path.join(__dirname, "app/views/pages/Relatorio.html"));
});

app.get("/membros", (req, res) => {
    res.sendFile(path.join(__dirname, "app/views/pages/Membro.html"));
});

app.get("/sociedades", (req, res) => {
    res.sendFile(path.join(__dirname, "app/views/pages/Sociedade.html"));
});

// Configurando o servidor para escutar na porta 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
