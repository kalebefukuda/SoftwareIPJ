import { connectDatabase } from '../../config/database.js';

class Admissao {
    constructor(data_admissao, forma_admissao, numero_ata, id_membro) {
        this.data_admissao = data_admissao;
        this.forma_admissao = forma_admissao;
        this.numero_ata = numero_ata;
        this.id_membro = id_membro;
    }

    static adicionarAdmissao(admissao, callback) {
        connectDatabase((err, connection) => {
            if (err) {
                callback(err, null);
                console.error(err);
                return;
            }

            connection.query('INSERT INTO ADMISSAO SET ?', admissao, (error, results) => {
                if (error) {
                    callback(error, null);
                    console.error(error);
                } else {
                    const novaAdmissaoId = results.insertId;
                    callback(null, novaAdmissaoId);
                }
                connection.release();
            });
        });
    }

    static listarTodasAdmissoes(callback) {
        connectDatabase((err, connection) => {
            if (err) {
                callback(err, null);
                return;
            }

            connection.query('SELECT * FROM ADMISSAO', (error, results) => {
                if (error) {
                    callback(error, null);
                } else {
                    callback(null, results);
                }
                connection.release();
            });
        });
    }

    static obterAdmissaoPorId(id, callback) {
        connectDatabase((err, connection) => {
            if (err) {
                callback(err, null);
                return;
            }

            connection.query('SELECT * FROM ADMISSAO WHERE ID_ADMISSAO = ?', id, (error, results) => {
                if (error) {
                    callback(error, null);
                    console.error(error);
                } else {
                    if (results.length === 0) {
                        callback(null, null);
                    } else {
                        const admissao = results[0];
                        callback(null, admissao);
                    }
                }
                connection.release();
            });
        });
    }

    static atualizarAdmissao(id, novosDados, callback) {
        connectDatabase((err, connection) => {
            if (err) {
                callback(err, null);
                return;
            }

            connection.query('UPDATE ADMISSAO SET ? WHERE ID_ADMISSAO = ?', [novosDados, id], (error, results) => {
                if (error) {
                    callback(error, null);
                } else {
                    callback(null, results.affectedRows > 0);
                }
                connection.release();
            });
        });
    }

    static excluirAdmissao(id, callback) {
        connectDatabase((err, connection) => {
            if (err) {
                callback(err, null);
                return;
            }

            connection.query('DELETE FROM ADMISSAO WHERE ID_ADMISSAO = ?', id, (error, results) => {
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

export default Admissao;
