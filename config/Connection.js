// import mysql2 from 'mysql2/promise';

// async function connect(){
//     if (global.connection && global.connection.state !== 'disconnected')
//         return global.connection

//     const mysql = mysql2
//     // mysql://usuario:senha@servidor:porta/banco - a conexão será assíncrona
//     const connection = await mysql.createConnection("mysql://root:1234@localhost:3306/software_ipj")

//     console.log("Conectado ao banco: software_ipj")
//     global.connection = connection
//     return connection
//     }
  
// teste

// export default connect

import mysql from "mysql2/promise";

// Configuração do banco de dados
const databaseConfig = {
    host: 'localhost',
    user: 'root',
    password: "1234",
    database: 'SOFTWARE_IPJ'
};

// Criar um pool de conexões
const pool = mysql.createPool(databaseConfig);

// Função para obter uma conexão do pool
const connect = async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Conexão do pool obtida com sucesso');
        return connection;
    } catch (err) {
        console.error('Erro ao obter conexão do pool:', err);
        throw err;
    }
};

export default connect;