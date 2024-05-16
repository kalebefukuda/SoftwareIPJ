import EleicaoDiacono from '../models/EleicaoDiaconoModel.js';

const EleicaoDiaconoController = {
    inserirEleicaoDiacono: async (req, res) => {
        const { id_diacono, id_membro, data_eleicao, reeleicao_1, reeleicao_2, reeleicao_3, reeleicao_4 } = req.body;

        const novaEleicaoDiacono = new EleicaoDiacono(
            id_diacono,
            id_membro,
            data_eleicao,
            reeleicao_1,
            reeleicao_2,
            reeleicao_3,
            reeleicao_4
        );

        EleicaoDiacono.adicionarEleicaoDiacono(novaEleicaoDiacono, (error, result) => {
            if (error) {
                res.status(500).json({ error: 'Erro ao inserir eleição de diácono' });
            } else {
                res.status(201).json({ message: 'Eleição de diácono inserida com sucesso', result });
            }
        });
    },

    listarTodasEleicoes: async (req, res) => {
        EleicaoDiacono.listarTodasEleicoes((error, results) => {
            if (error) {
                res.status(500).json({ error: 'Erro na requisição das eleições de diácono' });
            } else {
                res.status(200).json(results);
            }
        });
    }
};

export default EleicaoDiaconoController;
