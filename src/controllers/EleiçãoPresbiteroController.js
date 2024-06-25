import EleicaoPresbitero from '../models/EleiçãoPresbiterioModel.js';

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
    },

    obterEleicaoPresbiteroPorId: (req, res) => {
        const id = req.params.id;

        EleicaoPresbitero.obterEleicaoPresbiteroPorId(id, (error, eleicaoPresbitero) => {
            if (error) {
                res.status(500).json({ error: 'Erro ao buscar eleição de presbítero por ID' });
            } else if (!eleicaoPresbitero) {
                res.status(404).json({ message: 'Eleição de presbítero não encontrada' });
            } else {
                res.status(200).json({ message: 'Eleição de presbítero encontrada', data: eleicaoPresbitero });
            }
        });
    },

    atualizarEleicaoPresbitero: (req, res) => {
        const id = req.params.id;
        const novosDados = req.body;

        EleicaoPresbitero.atualizarEleicaoPresbitero(id, novosDados, (error, success) => {
            if (error) {
                res.status(500).json({ error: 'Erro ao atualizar eleição de presbítero' });
            } else if (!success) {
                res.status(404).json({ message: 'Eleição de presbítero não encontrada para atualização' });
            } else {
                res.status(200).json({ message: 'Eleição de presbítero atualizada com sucesso' });
            }
        });
    },

    excluirEleicaoPresbitero: (req, res) => {
        const id = req.params.id;

        EleicaoPresbitero.excluirEleicaoPresbitero(id, (error, success) => {
            if (error) {
                res.status(500).json({ error: 'Erro ao excluir eleição de presbítero' });
            } else if (!success) {
                res.status(404).json({ message: 'Eleição de presbítero não encontrada para exclusão' });
            } else {
                res.status(200).json({ message: 'Eleição de presbítero excluída com sucesso' });
            }
        });
    }
};

export default EleicaoPresbiteroController;