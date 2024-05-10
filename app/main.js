// Importar o módulo Express
import express from 'express';

// Importar as rotas
import routes from '../routes/routes.js';

// Criar uma instância do aplicativo Express
const app = express();

// Configurar o body parser para lidar com dados enviados via POST
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

// Configurar as rotas
app.use('/', routes);

// Iniciar o servidor
const port = 3000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
