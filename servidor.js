import express from 'express';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import fileUpload from 'express-fileupload';
import { router as sociedadeInternaRoutes } from './routes/rotaSociedadeInterna.js';
import { router as loginRoutes } from './routes/rotaLogin.js';
import { router as relatorioRoutes } from './routes/rotaRelatorio.js';
import { router as cadastroRoutes } from './routes/rotaCadastro.js';
import { router as membroRoutes } from './routes/rotaMembro.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const server = express();

// Adicione isso ao início do seu servidor.js para ativar logs detalhados
server.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    next();
});

// habilitar o fileUpload
server.use(fileUpload());

// tratar requisições JSON
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Configurar o Express.js para servir arquivos estáticos
server.use(express.static(path.join(__dirname, 'src', 'views')));
server.use(express.static(path.join(__dirname, 'src', 'views', 'assets')));

// Servir arquivos estáticos da pasta "uploads"
server.use('/uploads', express.static(path.join(__dirname, 'src', 'views', 'uploads')));

// Login
server.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'views', 'pages', 'Login.html'));
});
server.use("/login", loginRoutes);

// Home
server.get("/home", (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'views', 'pages', 'Home.html'));
});

// Cadastro 
server.use("/cadastro", cadastroRoutes);
server.use("/api/membros-create", membroRoutes);
server.use('/api/membros/:id', membroRoutes);
server.use('/api/membros/:id', membroRoutes);
// Página de Membros
server.use("/membros", membroRoutes);

// API de Membros
server.use("/api", membroRoutes);

// Relatorios
server.get("/relatorios", relatorioRoutes);
server.get("/relatorios/lista-aniversarios", relatorioRoutes);
server.get("/relatorios/lista-comungantes-fem", relatorioRoutes);
server.get("/relatorios/lista-comungantes-mas", relatorioRoutes);
server.get("/relatorios/lista-nao-comungantes-fem", relatorioRoutes);
server.get("/relatorios/lista-nao-comungantes-mas", relatorioRoutes);
server.get("/relatorios/lista-comungantes-sede", relatorioRoutes);
server.get("/relatorios/lista-data-casamento", relatorioRoutes);
server.get("/relatorios/lista-chamada-assembleia", relatorioRoutes);
server.get("/relatorios/lista-chamada-assembleia-adm", relatorioRoutes);

server.get("/api/lista-aniversarios", relatorioRoutes);
server.get("/api/lista-comungantes-fem", relatorioRoutes);
server.get("/api/lista-comungantes-mas", relatorioRoutes);
server.get("/api/lista-nao-comungantes-fem", relatorioRoutes);
server.get("/api/lista-nao-comungantes-mas", relatorioRoutes);
server.get("/api/lista-comungantes-sede", relatorioRoutes);
server.get("/api/lista-data-casamento", relatorioRoutes);
server.get("/api/lista-chamada-assembleia", relatorioRoutes);
server.get("/api/lista-chamada-assembleia-adm", relatorioRoutes);

// Cadastro
server.get("/cadastro", (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'views', 'pages', 'CadastroMembro.html'));
});

// Sociedade Interna
server.get("/sociedade-interna", sociedadeInternaRoutes);
server.get("/sociedade-interna/cadastro", sociedadeInternaRoutes);
server.get("/sociedade-cadastrada/:id", sociedadeInternaRoutes);
server.get("/sociedade-interna/editar-sociedade/:id", sociedadeInternaRoutes);

server.get("/api/sociedade-cadastrada/:id", sociedadeInternaRoutes);
server.get("/api/sociedade-interna", sociedadeInternaRoutes);
server.post("/api/cadastro-sociedade", sociedadeInternaRoutes);
server.put("/api/sociedade-interna/editar-sociedade/:id_sociedade_interna", sociedadeInternaRoutes);
server.delete("/api/sociedade-interna/delete/:id_sociedade_interna", sociedadeInternaRoutes);

// Configurando o servidor 
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
