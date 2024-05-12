import { connectDatabase } from '../../config/database.js';

class Endereço{

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

    static adicionarEndereço (endereco,callback) {
        connectDatabase((err, connection) => {
            if (err) {
                callback(err, null);
                console.error(error);
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

}


export default Endereço;