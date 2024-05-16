import database from "mysql2";

// Configuração do banco de dados
const databaseConfig = {
    host: 'localhost',
    user: 'root',
    database: 'SOFTWARE_IPJ'
};

// Criar um pool de conexões
const pool = database.createPool(databaseConfig);


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
