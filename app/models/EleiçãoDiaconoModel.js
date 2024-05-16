import { connectDatabase } from '../../config/database.js';

class EleicaoDiacono {
    constructor(id_eleicao_diacono, data_eleicao, reeleicao_1, reeleicao_2, reeleicao_3, reeleicao_4,id_membro) {
        this.id_eleicao_diacono = id_eleicao_diacono;
        this.data_eleicao = data_eleicao;
        this.reeleicao_1 = reeleicao_1;
        this.reeleicao_2 = reeleicao_2;
        this.reeleicao_3 = reeleicao_3;
        this.reeleicao_4 = reeleicao_4;
        this.id_membro = id_membro;
    }

    static adicionarEleicaoDiacono(eleicaoDiacono, callback) {
        connectDatabase((err, connection) => {
            if (err) {
                callback(err, null);
                console.error(err);
                return;
            }

            connection.query('INSERT INTO ELEICAO_DIACONO SET ?', eleicaoDiacono, (error, results) => {
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

    static listarTodasEleicoes(callback) {
        connectDatabase((err, connection) => {
            if (err) {
                callback(err, null);
                return;
            }

            connection.query('SELECT * FROM ELEICAO_DIACONO', (error, results) => {
                if (error) {
                    callback(error, null);
                } else {
                    callback(null, results);
                }
                connection.release();
            });
        });
    }
}

export default EleicaoDiacono;
