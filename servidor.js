import express from 'express';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { router as sociedadeInternaRoutes } from './routes/rotaSociedadeInterna.js';
import { router as loginRoutes } from './routes/rotaLogin.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = express();

// Middleware para tratar requisições JSON
server.use(express.json());
server.use(express.urlencoded({extended:true}))

// Configurar o Express.js para servir arquivos estáticos
server.use(express.static(path.join(__dirname, 'app', 'views')));


// Rota para a página de login
server.get("/", (req, res) => {
    // Envie o arquivo HTML da página de login
    res.sendFile(path.join(__dirname, 'app', 'views','pages', 'Login.html'));
});

// Rotas da Sociedade Interna
server.use("/sociedade-interna", sociedadeInternaRoutes);

// Configurando o servidor para escutar na porta 3000
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
