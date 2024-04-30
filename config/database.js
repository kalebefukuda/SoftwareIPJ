const database = require('mysql2');

//Config
const databaseConfig ={
    host: 'localhost',
    user: 'root',
    database: 'SOFTWARE_IPJ'
}

export function connectDatabase() {
    const connection = database.createConnection(databaseConfig);
    connection.connect((err) => {
        if (err) {
            console.error('Erro ao conectar ao banco de dados:', err);
            return;
        }
        console.log('Conexão foi efetivada');
    });
    return connection;
}



