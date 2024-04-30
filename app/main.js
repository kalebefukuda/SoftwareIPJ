//TODO rever funcionamento dessa main

const express = require('express');
const app = express();
const routes = require('../routes/routes');

// Configuração do body parser para lidar com dados enviados via POST
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuração das rotas
app.use('/', routes);

// Iniciar o servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
