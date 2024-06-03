import { connectDatabase } from '../../config/database.js';

class RolSeparado {
    constructor(data_rol_separado, ata_rol_separado, casamento, disciplina, data_disciplina, ata_disciplina, id_membro) {
        this.data_rol_separado = data_rol_separado;
        this.ata_rol_separado = ata_rol_separado;
        this.casamento = casamento;
        this.disciplina = disciplina;
        this.data_disciplina = data_disciplina;
        this.ata_disciplina = ata_disciplina;
        this.id_membro = id_membro;
    }

    static adicionarRolSeparado(rolSeparado, callback) {
        connectDatabase((err, connection) => {
            if (err) {
                callback(err, null);
                console.error(err);
                return;
            }

            connection.query('INSERT INTO ROL_SEPARADO SET ?', rolSeparado, (error, results) => {
                if (error) {
                    callback(error, null);
                    console.error(error);
                } else {
                    const novoRolSeparadoId = results.insertId;
                    callback(null, novoRolSeparadoId);
                }
                connection.release();
            });
        });
    }

    static listarTodosRolSeparado(callback) {
        connectDatabase((err, connection) => {
            if (err) {
                callback(err, null);
                return;
            }

            connection.query('SELECT * FROM ROL_SEPARADO', (error, results) => {
                if (error) {
                    callback(error, null);
                } else {
                    callback(null, results);
                }
                connection.release();
            });
        });
    }

    static obterRolSeparadoPorId(id, callback) {
        connectDatabase((err, connection) => {
            if (err) {
                callback(err, null);
                return;
            }

            connection.query('SELECT * FROM ROL_SEPARADO WHERE ID_ROL_SEPARADO = ?', id, (error, results) => {
                if (error) {
                    callback(error, null);
                    console.error(error);
                } else {
                    if (results.length === 0) {
                        callback(null, null);
                    } else {
                        const rolSeparado = results[0];
                        callback(null, rolSeparado);
                    }
                }
                connection.release();
            });
        });
    }

    static atualizarRolSeparado(id, novosDados, callback) {
        connectDatabase((err, connection) => {
            if (err) {
                callback(err, null);
                return;
            }

            connection.query('UPDATE ROL_SEPARADO SET ? WHERE ID_ROL_SEPARADO = ?', [novosDados, id], (error, results) => {
                if (error) {
                    callback(error, null);
                } else {
                    callback(null, results.affectedRows > 0);
                }
                connection.release();
            });
        });
    }

    static excluirRolSeparado(id, callback) {
        connectDatabase((err, connection) => {
            if (err) {
                callback(err, null);
                return;
            }

            connection.query('DELETE FROM ROL_SEPARADO WHERE ID_ROL_SEPARADO = ?', id, (error, results) => {
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

export default RolSeparado;
