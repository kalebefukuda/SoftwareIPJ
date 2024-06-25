import { connectDatabase } from '../../config/database.js';
class SociedadeInterna {
    constructor(nome_sociedade,foto_sociedade) {
        this.nome_sociedade = nome_sociedade;
        this.foto_sociedade = foto_sociedade;
    }

    static adicionarSociedadeInterna(sociedadeInterna, callback) {
        connectDatabase((err, connection) => {
            if (err) {
                callback(err, null);
                console.error(err);
                return;
            }
    
            connection.query('INSERT INTO SOCIEDADE_INTERNA SET ?', sociedadeInterna, (error, results) => {
                if (error) {
                    callback(error, null);
                    console.error(error);
                } else {
                    const novaSociedadeInterna = results.insertId;
                    callback(null, novaSociedadeInterna); // Retorna o ID do novo membro
                }
                connection.release();
            });
        });
    }    
    
    static listarTodasSociedadesInternas(callback) {
        connectDatabase((err, connection) => {
            if (err) {
                callback(err, null);
                return;
            }


            connection.query('SELECT * FROM SOCIEDADE_INTERNA', (error, results) => {
                if (error) {
                    callback(error, null);
                } else {
                    callback(null, results);
                }
                connection.release();
            });
        });
    }

    static obterSociedadePorId(id, callback) {
        connectDatabase((err, connection) => {
            if (err) {
                callback(err, null);
                return;
            }
    
            connection.query('SELECT * FROM SOCIEDADE_INTERNA WHERE ID_SOCIEDADE_INTERNA = ?', id, (error, results) => {
                if (error) {
                    callback(error, null);
                    console.error(error);
                } else {
                    if (results.length === 0) {
                        callback(null, null); // Membro não encontrado
                    } else {
                        const membro = results[0];
                        callback(null, membro);
                    }
                }
                connection.release();
            });
        });
    }    

    static atualizarSociedadeInterna(id, novosDados, callback) {
        connectDatabase((err, connection) => {
            if (err) {
                callback(err, null);
                return;
            }
    
            connection.query('UPDATE SOCIEDADE_INTERNA SET ? WHERE ID_SOCIEDADE_INTERNA = ?', [novosDados, id], (error, results) => {
                if (error) {
                    callback(error, null);
                } else {
                    callback(null, results.affectedRows > 0); // Retorna true se a atualização foi bem-sucedida
                }
                connection.release();
            });
        });
    }

    static excluirSociedadeInterna(id, callback) {
        connectDatabase((err, connection) => {
            if (err) {
                callback(err, null);
                return;
            }
    
            connection.query('DELETE FROM SOCIEDADE_INTERNA WHERE ID_SOCIEDADE_INTERNA = ?', id, (error, results) => {
                if (error) {
                    callback(error, null);
                } else {
                    callback(null, results.affectedRows > 0); // Retorna true se a exclusão foi bem-sucedida
                }
                connection.release();
            });
        });
    }
}

export default SociedadeInterna;
