import { connectDatabase } from '../../config/database.js';
class ProfissaoDeFe {
    constructor(data_profissao_de_fe,nome_oficiante,id_membro) {
        this.data_profissao_de_fe = data_profissao_de_fe;
        this.nome_oficiante = nome_oficiante;
        this.id_membro = id_membro;
    }

    static adicionarProfissaoDeFe(profissaoDeFe, callback) {
        connectDatabase((err, connection) => {
            if (err) {
                callback(err, null);
                console.error(err);
                return;
            }
    
            connection.query('INSERT INTO PROFISSAO_DE_FE SET ?', profissaoDeFe, (error, results) => {
                if (error) {
                    callback(error, null);
                    console.error(error);
                } else {
                    callback(null, results); // Retorna o ID do novo membro
                }
                connection.release();
            });
        });
    }    
    
    static listarTodasPrifissoesDeFe(callback) {
        connectDatabase((err, connection) => {
            if (err) {
                callback(err, null);
                return;
            }


            connection.query('SELECT * FROM PROFISSAO_DE_FE', (error, results) => {
                if (error) {
                    callback(error, null);
                } else {
                    callback(null, results);
                }
                connection.release();
            });
        });
    }

    static obterProfissaoDeFePorId(id, callback) {
        connectDatabase((err, connection) => {
            if (err) {
                callback(err, null);
                return;
            }
    
            connection.query('SELECT * FROM PROFISSAO_DE_FE WHERE ID_PROFISSAO_DE_FE = ?', id, (error, results) => {
                if (error) {
                    callback(error, null);
                    console.error(error);
                } else {
                    if (results.length === 0) {
                        callback(null, null); 
                    } else {
                        const fe = results[0];
                        callback(null, fe);
                    }
                }
                connection.release();
            });
        });
    }    

    static atualizarProfissaoDeFe(id, novosDados, callback) {
        connectDatabase((err, connection) => {
            if (err) {
                callback(err, null);
                return;
            }
    
            connection.query('UPDATE PROFISSAO_DE_FE SET ? WHERE ID_PROFISSAO_DE_FE = ?', [novosDados, id], (error, results) => {
                if (error) {
                    callback(error, null);
                } else {
                    callback(null, results.affectedRows > 0); // Retorna true se a atualização foi bem-sucedida
                }
                connection.release();
            });
        });
    }

    static excluirProfissaoDeFe(id, callback) {
        connectDatabase((err, connection) => {
            if (err) {
                callback(err, null);
                return;
            }
    
            connection.query('DELETE FROM PROFISSAO_DE_FE WHERE ID_PROFISSAO_DE_FE = ?', id, (error, results) => {
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

export default ProfissaoDeFe;
