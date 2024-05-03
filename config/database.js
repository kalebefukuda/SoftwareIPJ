import database from "mysql2";

// Configuração do banco de dados
const databaseConfig = {
    host: 'localhost',
    user: 'root',
    database: 'SOFTWARE_IPJ'
};

// Criar um pool de conexões
const pool = database.createPool(databaseConfig);

// Função que retorna uma nova conexão do pool
const connectDatabase = () => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.error('Erro ao obter conexão do pool:', err);
                reject(err);
            } else {
                console.log('Conexão do pool obtida com sucesso');
                // Configurações adicionais da conexão, se necessário
                resolve(connection);
            }
        });
    });
};

export default connectDatabase;
