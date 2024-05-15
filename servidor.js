import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Configurar o Express.js para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'app', 'views')));

// Rota para página de login
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'app', 'views', 'pages', 'Login.html'));
});

// Rota para página inicial (home)
app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'app', 'views', 'pages', 'Home.html'));
});

// Rota para página de cadastro de membro
app.get('/cadastro', (req, res) => {
  res.sendFile(path.join(__dirname, 'app', 'views', 'pages', 'CadastroMembro.html'));
});

// Rota para página de membros
app.get('/membros', (req, res) => {
  res.sendFile(path.join(__dirname, 'app', 'views', 'pages', 'Membro.html'));
});

// Rota para página de relatórios
app.get('/relatorios', (req, res) => {
  res.sendFile(path.join(__dirname, 'app', 'views', 'pages', 'Relatorio.html'));
});

// Rota para página de sociedades
app.get('/sociedades', (req, res) => {
  res.sendFile(path.join(__dirname, 'app', 'views', 'pages', 'Sociedade.html'));
});

// Rota para página de cadastro de sociedades
app.get('/cadastroSociedade', (req, res) => {
  res.sendFile(path.join(__dirname, 'app', 'views', 'pages', 'CadastroSociedade.html'));
});

// Configurando o servidor para escutar na porta 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
