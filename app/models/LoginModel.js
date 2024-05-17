import { connectDatabase } from '../../config/database.js';
import bcrypt from 'bcrypt';

class Login {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    static verificarCredenciais(login, callback) {

        connectDatabase((err, connection) => {
            if (err) {
                callback(err, null);
                console.error(err);
                return;
            }

            // Consulta o banco de dados para encontrar o usuário pelo nome de usuário
            connection.query('SELECT * FROM LOGIN WHERE USUARIO = ?', [login.username], async (error, results) => {
                if (error) {
                    callback(error, null);
                    console.error(error);
                } else {
                    if (results.length === 0) {
                        callback(null, false); // Usuário não encontrado
                    } else {
                        const user = results[0];
                        // Compara a senha fornecida com a senha armazenada no banco de dados (usando bcrypt)
                        const isMatch = await bcrypt.compare(login.password, user.password);
                        callback(null, isMatch ? user : false); // Verifica a senha e retorna o usuário se for uma correspondência
                    }
                }
                connection.release(); // Libera a conexão de volta para o pool
            });
        });
    }

    static registrarUsuario(login, callback) {
        connectDatabase(async (err, connection) => {
            if (err) {
                callback(err, null);
                console.error(err);
                return;
            }

            try {
                const hashedPassword = await bcrypt.hash(login.password, 10);
                connection.query('INSERT INTO LOGIN (USUARIO, SENHA) VALUES (?, ?)', [login.username, hashedPassword], (error, results) => {
                    if (error) {
                        callback(error, null);
                        console.error(error);
                    } else {
                        callback(null, results);
                    }
                    connection.release();
                });
            } catch (hashError) {
                callback(hashError, null);
                console.error(hashError);
            }
        });
    }

    static encontrarUsuarioPorNome(username, callback) {
        connectDatabase((err, connection) => {
            if (err) {
                callback(err, null);
                console.error(err);
                return;
            }
            connection.query('SELECT * FROM LOGIN WHERE USUARIO = ?', [username], (error, results) => {
                if (error) {
                    callback(error, null);
                    console.error(error);
                } else {
                    callback(null, results.length > 0 ? results[0] : null);
                }
                connection.release();
            });
        });
    }
}

export default Login;
