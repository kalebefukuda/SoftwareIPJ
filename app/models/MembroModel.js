import { connectDatabase } from '../../config/database.js';
class Membro {
    constructor(nome, comungante, data_nascimento, nome_pai, nome_mae, sexo, escolaridade, profissao, numero_de_rol, email, telefone, celular, foto_membro,estado_civil) {
        this.nome = nome;
        this.comungante = comungante;
        this.data_nascimento = data_nascimento;
        this.nome_pai = nome_pai;
        this.nome_mae = nome_mae;
        this.sexo = sexo;
        this.escolaridade = escolaridade;
        this.profissao = profissao;
        this.numero_de_rol = numero_de_rol;
        this.email = email;
        this.telefone = telefone;
        this.celular = celular;
        this.foto_membro = foto_membro;
        this.estado_civil = estado_civil;
    }

    static adicionarMembro(membro, callback) {
        connectDatabase((err, connection) => {
            if (err) {
                callback(err, null);
                console.error(err);
                return;
            }
    
            connection.query('INSERT INTO MEMBRO SET ?', membro, (error, results) => {
                if (error) {
                    callback(error, null);
                    console.error(error);
                } else {
                    const novoMembroId = results.insertId;
                    callback(null, novoMembroId); // Retorna o ID do novo membro
                }
                connection.release();
            });
        });
    }    
    
    static listarTodosMembros(callback) {
        connectDatabase((err, connection) => {
            if (err) {
                callback(err, null);
                return;
            }


            connection.query('SELECT * FROM MEMBRO', (error, results) => {
                if (error) {
                    callback(error, null);
                } else {
                    callback(null, results);
                }
                connection.release();
            });
        });
    }

    static obterMembroPorId(id, callback) {
        connectDatabase((err, connection) => {
            if (err) {
                callback(err, null);
                return;
            }
    
            connection.query('SELECT * FROM MEMBRO WHERE ID_MEMBRO = ?', id, (error, results) => {
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

    static atualizarMembro(id, novosDados, callback) {
        connectDatabase((err, connection) => {
            if (err) {
                callback(err, null);
                return;
            }
    
            connection.query('UPDATE MEMBRO SET ? WHERE ID_MEMBRO = ?', [novosDados, id], (error, results) => {
                if (error) {
                    callback(error, null);
                } else {
                    callback(null, results.affectedRows > 0); // Retorna true se a atualização foi bem-sucedida
                }
                connection.release();
            });
        });
    }

    static excluirMembro(id, callback) {
        connectDatabase((err, connection) => {
            if (err) {
                callback(err, null);
                return;
            }
    
            connection.query('DELETE FROM MEMBRO WHERE ID_MEMBRO = ?', id, (error, results) => {
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

export default Membro;
