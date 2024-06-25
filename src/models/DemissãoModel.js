import { connectDatabase } from '../../config/database.js';

class Demissao {
    constructor(data_demissao, forma_demissao, numero_ata, id_membro) {
        this.data_demissao = data_demissao;
        this.forma_demissao = forma_demissao;
        this.numero_ata = numero_ata;
        this.id_membro = id_membro;
    }

    static adicionarDemissao(demissao, callback) {
        connectDatabase((err, connection) => {
            if (err) {
                callback(err, null);
                console.error(err);
                return;
            }

            connection.query('INSERT INTO DEMISSAO SET ?', demissao, (error, results) => {
                if (error) {
                    callback(error, null);
                    console.error(error);
                } else {
                    const novaDemissaoId = results.insertId;
                    callback(null, novaDemissaoId);
                }
                connection.release();
            });
        });
    }

    static listarTodasDemissoes(callback) {
        connectDatabase((err, connection) => {
            if (err) {
                callback(err, null);
                return;
            }

            connection.query('SELECT * FROM DEMISSAO', (error, results) => {
                if (error) {
                    callback(error, null);
                } else {
                    callback(null, results);
                }
                connection.release();
            });
        });
    }

    static obterDemissaoPorId(id, callback) {
        connectDatabase((err, connection) => {
            if (err) {
                callback(err, null);
                return;
            }

            connection.query('SELECT * FROM DEMISSAO WHERE ID_DEMISSAO = ?', id, (error, results) => {
                if (error) {
                    callback(error, null);
                    console.error(error);
                } else {
                    if (results.length === 0) {
                        callback(null, null);
                    } else {
                        const demissao = results[0];
                        callback(null, demissao);
                    }
                }
                connection.release();
            });
        });
    }

    static atualizarDemissao(id, novosDados, callback) {
        connectDatabase((err, connection) => {
            if (err) {
                callback(err, null);
                return;
            }

            connection.query('UPDATE DEMISSAO SET ? WHERE ID_DEMISSAO = ?', [novosDados, id], (error, results) => {
                if (error) {
                    callback(error, null);
                } else {
                    callback(null, results.affectedRows > 0);
                }
                connection.release();
            });
        });
    }

    static excluirDemissao(id, callback) {
        connectDatabase((err, connection) => {
            if (err) {
                callback(err, null);
                return;
            }

            connection.query('DELETE FROM DEMISSAO WHERE ID_DEMISSAO = ?', id, (error, results) => {
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

export default Demissao;
