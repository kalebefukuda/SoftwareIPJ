import express from 'express';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { router as sociedadeInternaRoutes } from './routes/rotaSociedadeInterna.js';
import { router as loginRoutes } from './routes/rotaLogin.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const server = express();


// tratar requisições JSON
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Configurar o Express.js para servir arquivos estáticos
server.use(express.static(path.join(__dirname, 'app', 'views')));


//Login
server.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'app', 'views', 'pages', 'Login.html'));
});
server.use("/login", loginRoutes);



// Home
server.get("/home", (req, res) => {
    res.sendFile(path.join(__dirname, 'app', 'views', 'pages', 'Home.html'));
});


// Cadastro
server.get("/cadastro", (req, res) => {
    res.sendFile(path.join(__dirname, 'app', 'views', 'pages', 'CadastroMembro.html'));
});


// Relatorio
server.get("/relatorios", (req, res) => {
    res.sendFile(path.join(__dirname, 'app', 'views', 'pages', 'Relatorio.html'));
});


//Membro
server.get("/membros", (req, res) => {
    res.sendFile(path.join(__dirname, 'app', 'views', 'pages', 'Membro.html'));
});

//Sociedade Interna
server.use("/sociedade-interna", sociedadeInternaRoutes);

// Configurando o servidor 
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
