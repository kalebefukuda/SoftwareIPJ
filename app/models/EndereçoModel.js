import { connectDatabase } from '../../config/database.js';
import { replace} from 'lodash';


class Endereco {

    constructor(id_membro, cep, endereco, bairro, complemento, cidade, estado, local_residencia, local_nascimento, estado_nascimento) {
        this.id_membro = id_membro;
        this.cep = cep;
        this.endereco = endereco;
        this.bairro = bairro;
        this.complemento = complemento;
        this.cidade = cidade;
        this.estado = estado;
        this.local_residencia = local_residencia;
        this.local_nascimento = local_nascimento;
        this.estado_nascimento = estado_nascimento;
    }


    static adicionarEndereco(endereco, callback) {
        // Validar o CEP antes de prosseguir com a inserção
        const cepSemFormato = replace(endereco.cep, /[.-]/g, ''); // Remover pontos e traços
        const cepValido = cepSemFormato.length === 8; // Verificar se o CEP tem o tamanho correto

        if (!cepValido) {
            console.error(new Error('CEP inválido'));
            callback(error, null);
            return;
        }

        connectDatabase((err, connection) => {
            if (err) {
                callback(err, null);
                console.error(err);
                return;
            }

            connection.query('INSERT INTO ENDERECO SET ?', endereco, (error, results) => {
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



    static listarTodosEnderecos(callback) {
        connectDatabase((err, connection) => {
            if (err) {
                callback(err, null);
                return;
            }

            connection.query('SELECT * FROM ENDERECO', (error, results) => {
                if (error) {
                    callback(error, null);
                } else {
                    callback(null, results);
                }
                connection.release();
            });
        });
    }

    static obterEnderecoPorId(id, porMembro, callback) {
        connectDatabase((err, connection) => {
            if (err) {
                callback(err, null);
                return;
            }

            const campo = porMembro ? 'ID_MEMBRO' : 'ID_ENDERECO';
            connection.query(`SELECT * FROM ENDERECO WHERE ${campo} = ?`, [id], (error, results) => {
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

    static atualizarEndereco(id, novosDados, callback) {
        connectDatabase((err, connection) => {
            if (err) {
                callback(err, null);
                return;
            }

            connection.query('UPDATE ENDERECO SET ? WHERE ID_ENDERECO = ?', [novosDados, id], (error, results) => {
                if (error) {
                    callback(error, null);
                } else {
                    callback(null, results.affectedRows > 0);
                }
                connection.release();
            });
        });
    }

    static excluirEndereco(id, callback) {
        connectDatabase((err, connection) => {
            if (err) {
                callback(err, null);
                return;
            }

            connection.query('DELETE FROM ENDERECO WHERE ID_ENDERECO = ?', [id], (error, results) => {
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

export default Endereco;
