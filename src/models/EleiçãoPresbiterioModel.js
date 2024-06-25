import { connectDatabase } from '../../config/database.js';

class EleicaoPresbitero {
    constructor(id_membro, data_eleicao, reeleicao_1, reeleicao_2, reeleicao_3, reeleicao_4) {
        this.id_membro = id_membro;
        this.data_eleicao = data_eleicao;
        this.reeleicao_1 = reeleicao_1;
        this.reeleicao_2 = reeleicao_2;
        this.reeleicao_3 = reeleicao_3;
        this.reeleicao_4 = reeleicao_4;
    }

    static adicionarEleicaoPresbitero(eleicaoPresbitero, callback) {
        connectDatabase((err, connection) => {
            if (err) {
                callback(err, null);
                console.error(err);
                return;
            }

            connection.query('INSERT INTO ELEICAO_PRESBITERO SET ?', eleicaoPresbitero, (error, results) => {
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

    static listarTodasEleicoes(callback) {
        connectDatabase((err, connection) => {
            if (err) {
                callback(err, null);
                return;
            }

            connection.query('SELECT * FROM ELEICAO_PRESBITERO', (error, results) => {
                if (error) {
                    callback(error, null);
                } else {
                    callback(null, results);
                }
                connection.release();
            });
        });
    }

    static obterEleicaoPresbiteroPorId(id, callback) {
        connectDatabase((err, connection) => {
            if (err) {
                callback(err, null);
                return;
            }

            connection.query('SELECT * FROM ELEICAO_PRESBITERO WHERE id_membro = ?', [id], (error, results) => {
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

    static excluirEleicaoPresbitero(id, callback) {
        connectDatabase((err, connection) => {
            if (err) {
                callback(err, null);
                return;
            }

            connection.query('DELETE FROM ELEICAO_PRESBITERO WHERE id_membro = ?', [id], (error, results) => {
                if (error) {
                    callback(error, null);
                } else {
                    callback(null, results.affectedRows > 0);
                }
                connection.release();
            });
        });
    }

    static atualizarEleicaoPresbitero(id, novosDados, callback) {
        connectDatabase((err, connection) => {
            if (err) {
                callback(err, null);
                return;
            }

            connection.query('UPDATE ELEICAO_PRESBITERO SET ? WHERE id_membro = ?', [novosDados, id], (error, results) => {
                if (error) {
                    callback(error, null);
                } else {
                    callback(null, results.affectedRows > 0);
                }
                connection.release();
            });
        });
    }
}

export default EleicaoPresbitero;
