import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

// Configuração do banco de dados usando variáveis de ambiente
const databaseConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME
};

// Criar um pool de conexões
const pool = mysql.createPool(databaseConfig);

// Função que obtém uma conexão do pool e a passa para a função de retorno de chamada
const connectDatabase = (callback) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Erro ao obter conexão do pool:', err);
            callback(err, null);
        } else {
            console.log('Conexão do pool obtida com sucesso');
            callback(null, connection);
        }
    });
};

export { connectDatabase };
