import DemissaoModel from '../models/DemissãoModel.js';

const DemissaoController = {

    inserirDemissao: async (req, res) => {
        const {
            data_demissao,
            forma_demissao,
            numero_ata,
            id_membro
        } = await req.body;

        const novaDemissao = new DemissaoModel(
            data_demissao,
            forma_demissao,
            numero_ata,
            id_membro
        );

        DemissaoModel.adicionarDemissao(novaDemissao, (error, demissaoId) => {
            if (error) {
                res.status(500).json({ error: 'Erro ao inserir demissão' });
            } else {
                res.status(201).json({ message: 'Demissão inserida com sucesso', demissaoId: demissaoId });
            }
        });
    },

    listarTodasDemissoes: async (req, res) => {
        DemissaoModel.listarTodasDemissoes((error, results) => {
            if (error) {
                res.status(500).json({ error: 'Erro na requisição das demissões' });
            } else {
                res.status(201).json({ message: 'Demissões em json:', results: results });
            }
        });
    },

    obterDemissaoPorId: async (req, res) => {
        const demissaoId = req.params.id;

        DemissaoModel.obterDemissaoPorId(demissaoId, (err, demissao) => {
            if (err) {
                res.status(500).json({ error: 'Erro ao buscar demissão por ID' });
            } else if (!demissao) {
                res.status(404).json({ message: 'Demissão não encontrada' });
            } else {
                res.status(200).json({ demissao });
            }
        });
    },

    atualizarDemissao: async (req, res) => {
        const demissaoId = req.params.id;
        const novosDadosDemissao = req.body;

        DemissaoModel.atualizarDemissao(demissaoId, novosDadosDemissao, (err, result) => {
            if (err) {
                res.status(500).json({ error: 'Erro ao atualizar demissão' });
            } else {
                if (result) {
                    res.status(200).json({ message: 'Demissão atualizada com sucesso', LinesAffected: result });
                } else {
                    res.status(404).json({ message: 'Demissão não encontrada' });
                }
            }
        });
    },

    excluirDemissao: async (req, res) => {
        const demissaoId = req.params.id;

        DemissaoModel.excluirDemissao(demissaoId, (err, result) => {
            if (err) {
                res.status(500).json({ error: 'Erro ao excluir demissão' });
            } else {
                if (result) {
                    res.status(200).json({ message: 'Demissão excluída com sucesso' });
                } else {
                    res.status(404).json({ message: 'Demissão não encontrada' });
                }
            }
        });
    },

};

export default DemissaoController;
