import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
//import { router as sociedadeInternaRoutes } from './routes/SociedadeInternaRoute.js';
import { router as loginRoutes } from './routes/LoginRoute.js';
import { router as membroRoutes } from './routes/MembroRoute.js';
import { router as enderecoRoutes } from './routes/EndereçoRoute.js';
import { router as eleicaoDiaconoRoutes } from './routes/EleiçãoDiaconoRoute.js';
import { router as eleicaoPresbiteroRoutes } from './routes/EleiçãoPresbiteroRoute.js';
import { router as batismoRoutes } from './routes/BatismoRoute.js';
import { router as admissaoRoutes } from './routes/AdmissãoRoute.js';
import { router as demissaoRoutes } from './routes/DemissãoRoute.js';
import { router as profissaodeFeRoutes } from './routes/ProfissãoDeFéRoute.js';




const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = express();
dotenv.config();

// Tratar requisições JSON
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Configurar o Express.js para servir arquivos estáticos
server.use(express.static(path.join(__dirname, 'app', 'views')));

// Configurar rotas
//server.use('/sociedade-interna', sociedadeInternaRoutes);
server.use('/login', loginRoutes);
server.use('/membro', membroRoutes);
server.use('/endereco', enderecoRoutes);
server.use('/eleicao-diacono', eleicaoDiaconoRoutes);
server.use('/eleicao-presbitero', eleicaoPresbiteroRoutes);
server.use('/batismo', batismoRoutes);
server.use('/admissao', admissaoRoutes);
server.use('/demissao', demissaoRoutes);
server.use('/profissao-de-fe', profissaodeFeRoutes);



// Configurar o servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
