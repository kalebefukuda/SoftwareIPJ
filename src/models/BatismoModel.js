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

    static obterBatismoPorId(id, callback) {
        connectDatabase((err, connection) => {
            if (err) {
                callback(err, null);
                return;
            }

            connection.query('SELECT * FROM BATISMO WHERE id_batismo = ?', [id], (error, results) => {
                if (error) {
                    callback(error, null);
                } else {
                    if (results.length === 0) {
                        callback(null, null);
                    } else {
                        callback(null, results[0]);
                    }
                }
                connection.release();
            });
        });
    }

    static atualizarBatismo(id, novosDados, callback) {
        connectDatabase((err, connection) => {
            if (err) {
                callback(err, null);
                return;
            }

            connection.query('UPDATE BATISMO SET ? WHERE id_batismo = ?', [novosDados, id], (error, results) => {
                if (error) {
                    callback(error, null);
                    console.error(error);
                } else {
                    callback(null, results.affectedRows > 0);
                }
                connection.release();
            });
        });
    }

    static excluirBatismo(id, callback) {
        connectDatabase((err, connection) => {
            if (err) {
                callback(err, null);
                return;
            }

            connection.query('DELETE FROM BATISMO WHERE id_batismo = ?', [id], (error, results) => {
                if (error) {
                    callback(error, null);
                    console.error(error);
                } else {
                    callback(null, results.affectedRows > 0);
                }
                connection.release();
            });
        });
    }
}

export default Batismo;
