import EleicaoPresbitero from '../models/EleicaoPresbiteroModel.js';

const EleicaoPresbiteroController = {
    inserirEleicaoPresbitero: async (req, res) => {
        const { id_membro, data_eleicao, reeleicao_1, reeleicao_2, reeleicao_3, reeleicao_4 } = req.body;

        const novaEleicaoPresbitero = new EleicaoPresbitero(
            id_membro,
            data_eleicao,
            reeleicao_1,
            reeleicao_2,
            reeleicao_3,
            reeleicao_4
        );

        EleicaoPresbitero.adicionarEleicaoPresbitero(novaEleicaoPresbitero, (error, result) => {
            if (error) {
                res.status(500).json({ error: 'Erro ao inserir eleição de presbítero' });
            } else {
                res.status(201).json({ message: 'Eleição de presbítero inserida com sucesso', result });
            }
        });
    },

    listarTodasEleicoes: async (req, res) => {
        EleicaoPresbitero.listarTodasEleicoes((error, results) => {
            if (error) {
                res.status(500).json({ error: 'Erro na requisição das eleições de presbítero' });
            } else {
                res.status(200).json(results);
            }
        });
    }
};

export default EleicaoPresbiteroController;
