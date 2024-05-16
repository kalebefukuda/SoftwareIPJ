import { connectDatabase } from '../../config/database.js';

class Batismo {
    constructor(id_membro, data_batismo, nome_oficiante) {
        this.id_membro = id_membro;
        this.data_batismo = data_batismo;
        this.nome_oficiante = nome_oficiante;
    }

    static adicionarBatismo(batismo, callback) {
        connectDatabase((err, connection) => {
            if (err) {
                callback(err, null);
                console.error(err);
                return;
            }

            connection.query('INSERT INTO BATISMO SET ?', batismo, (error, results) => {
                if (error) {
                    callback(error, null);
                    console.error(error);
                } else {
                    callback(null, results);
                }
                connection.release();
            });
        });
    }

    static listarTodosBatismos(callback) {
        connectDatabase((err, connection) => {
            if (err) {
                callback(err, null);
                return;
            }

            connection.query('SELECT * FROM BATISMO', (error, results) => {
                if (error) {
                    callback(error, null);
                } else {
                    callback(null, results);
                }
                connection.release();
            });
        });
    }
}

export default Batismo;
