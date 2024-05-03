import connectDatabase from '../../config/database.js';

class Membro {
    constructor(id_membro, nome, comungante, data_nascimento, nome_pai, nome_mae, sexo, escolaridade, profissao, numero_de_rol, email, telefone, celular, foto_membro) {
        this.id_membro = id_membro;
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
    }

    //Funções de DDL(Data Definition Language)
    static adicionarMembro(membro, callback) {
        //Método then é como se fosse um async
        connectDatabase().then(connection => {
            connection.query('INSERT INTO MEMBRO SET ?', membro, (error, results) => {
                if (error) {
                    callback(error, null);
                } else {
                    callback(null, results.insertId); // InsertId retorna o id autoincremeto da nova inserção
                }
                connection.release();
            });
        }).catch(error => {
            console.error('Erro ao obter conexão do pool:', error);
            callback(error, null);
        });
    }

    //Funções de DML(Data Manipulation Language)
    static listarTodosMembros(callback) {
        connectDatabase().then(connection => {
            connection.query('SELECT * FROM MEMBRO', (error, results) => {
                if (error) {
                    callback(error, null);
                } else {
                    callback(null, results);
                }
                connection.release();
            });
        }).catch(error => {
            console.error('Erro ao obter conexão do pool:', error);
            callback(error, null);
        });
    }
}

export default Membro;
