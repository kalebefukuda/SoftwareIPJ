const database = require ('../../config/database');

export class Membro{
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
    static adicionarMembro(membro,callback){
        const connection = database.connectDatabase();
        connection.query('INSERT INTO membros SET ?',membro,(error,results) =>{
            connection.end();
            if(error){
                callback(error,null);
            } else {
                callback(null,results.insertId); //InsertId retorna o id autoincremeto da nova inserção
            }
        })
    }






    //Funçoes de DML(Data Manipulation Language)
    static listarTodosMembros(callback) {
        const connection = database.connectDatabase();
        connection.query('SELECT * FROM MEMBRO', (error, results) => {
            connection.end(); // Fechar a conexão após a consulta
            if (error) {
                callback(error, null);
            } else {
                const membros = results.map(row => new Membro(row.id_membro, row.nome, row.comungante, row.data_nascimento, row.nome_pai, row.nome_mae, row.sexo, row.escolaridade, row.profissao, row.numero_de_rol, row.email, row.telefone, row.celular, row.foto_membro));
                callback(null, membros);
            }
        });
    }







}