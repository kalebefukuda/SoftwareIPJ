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
                    callback(null, results);
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


            getDatabasePool.query('SELECT * FROM MEMBRO', (error, results) => {
                if (error) {
                    callback(error, null);
                } else {
                    callback(null, results);
                    console.log(results);
                }
                connection.release();
            });
        });
    }
}

export default Membro;
