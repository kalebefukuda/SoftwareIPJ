import EleicaoDiacono from '../models/EleiçãoDiaconoModel.js';

const EleicaoDiaconoController = {
    inserirEleicaoDiacono: async (req, res) => {
        const {
            data_eleicao,
            reeleicao_1,
            reeleicao_2,
            reeleicao_3,
            reeleicao_4,
            id_membro,
        } = req.body;


        const novaEleicaoDiacono = new EleicaoDiacono(
            data_eleicao,
            reeleicao_1,
            reeleicao_2,
            reeleicao_3,
            reeleicao_4,
            id_membro,
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
    },

    obterEleicaoDiaconoPorId: (req, res) => {
        const id = req.params.id;

        EleicaoDiacono.obterEleicaoDiaconoPorId(id, (error, eleicaoDiacono) => {
            if (error) {
                res.status(500).json({ error: 'Erro ao buscar eleição de diácono por ID' });
            } else if (!eleicaoDiacono) {
                res.status(404).json({ message: 'Eleição de diácono não encontrada' });
            } else {
                res.status(200).json({ message: 'Eleição de diácono encontrada', data: eleicaoDiacono });
            }
        });
    },

    atualizarEleicaoDiacono: (req, res) => {
        const id = req.params.id;
        const novosDados = req.body;

        EleicaoDiacono.atualizarEleicaoDiacono(id, novosDados, (error, updated) => {
            if (error) {
                res.status(500).json({ error: 'Erro ao atualizar eleição de diácono' });
            } else if (!updated) {
                res.status(404).json({ message: 'Eleição de diácono não encontrada' });
            } else {
                res.status(200).json({ message: 'Eleição de diácono atualizada com sucesso' });
            }
        });
    },

    excluirEleicaoDiacono: (req, res) => {
        const id = req.params.id;

        EleicaoDiacono.excluirEleicaoDiacono(id, (error, deleted) => {
            if (error) {
                res.status(500).json({ error: 'Erro ao excluir eleição de diácono' });
            } else if (!deleted) {
                res.status(404).json({ message: 'Eleição de diácono não encontrada' });
            } else {
                res.status(200).json({ message: 'Eleição de diácono excluída com sucesso' });
            }
        });
    }

};

export default EleicaoDiaconoController;
