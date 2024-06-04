import { connectDatabase } from '../../config/database.js';

class MembroSociedade {
    constructor(id_membro, id_sociedade_interna) {
        this.id_membro = id_membro;
        this.id_sociedade_interna = id_sociedade_interna;
    }

    static adicionarMembroSociedade(membroSociedade, callback) {
        connectDatabase((err, connection) => {
            if (err) {
                callback(err, null);
                return;
            }

            connection.query('INSERT INTO MEMBRO_SOCIEDADE SET ?', membroSociedade, (error, results) => {
                if (error) {
                    callback(error, null);
                } else {
                    const novoMembroSociedadeId = results.insertId;
                    callback(null, novoMembroSociedadeId);
                }
                connection.release();
            });
        });
    }

    static listarTodosMembrosSociedade(callback) {
        connectDatabase((err, connection) => {
            if (err) {
                callback(err, null);
                return;
            }

            connection.query('SELECT * FROM MEMBRO_SOCIEDADE', (error, results) => {
                if (error) {
                    callback(error, null);
                } else {
                    callback(null, results);
                }
                connection.release();
            });
        });
    }

    static obterMembroSociedadePorId(id, callback) {
        connectDatabase((err, connection) => {
            if (err) {
                callback(err, null);
                return;
            }

            connection.query('SELECT * FROM MEMBRO_SOCIEDADE WHERE ID_MEMBRO_SOCIEDADE = ?', id, (error, results) => {
                if (error) {
                    callback(error, null);
                } else {
                    if (results.length === 0) {
                        callback(null, null);
                    } else {
                        const membroSociedade = results[0];
                        callback(null, membroSociedade);
                    }
                }
                connection.release();
            });
        });
    }

    static atualizarMembroSociedade(id, novosDados, callback) {
        connectDatabase((err, connection) => {
            if (err) {
                callback(err, null);
                return;
            }

            connection.query('UPDATE MEMBRO_SOCIEDADE SET ? WHERE ID_MEMBRO_SOCIEDADE = ?', [novosDados, id], (error, results) => {
                if (error) {
                    callback(error, null);
                } else {
                    callback(null, results.affectedRows > 0);
                }
                connection.release();
            });
        });
    }

    static excluirMembroSociedade(id, callback) {
        connectDatabase((err, connection) => {
            if (err) {
                callback(err, null);
                return;
            }

            connection.query('DELETE FROM MEMBRO_SOCIEDADE WHERE ID_MEMBRO_SOCIEDADE = ?', id, (error, results) => {
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

export default MembroSociedade;
