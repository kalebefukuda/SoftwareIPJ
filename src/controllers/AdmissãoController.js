import AdmissaoModel from '../models/AdmissãoModel.js';

const AdmissaoController = {

    inserirAdmissao: async (req, res) => {
        const {
            data_admissao,
            forma_admissao,
            numero_ata,
            id_membro
        } = await req.body;

        const novaAdmissao = new AdmissaoModel(
            data_admissao,
            forma_admissao,
            numero_ata,
            id_membro
        );

        AdmissaoModel.adicionarAdmissao(novaAdmissao, (error, admissaoId) => {
            if (error) {
                res.status(500).json({ error: 'Erro ao inserir admissão' });
            } else {
                res.status(201).json({ message: 'Admissão inserida com sucesso', admissaoId: admissaoId });
            }
        });
    },

    listarTodasAdmissoes: async (req, res) => {
        AdmissaoModel.listarTodasAdmissoes((error, results) => {
            if (error) {
                res.status(500).json({ error: 'Erro na requisição das admissões' });
            } else {
                res.status(201).json({ message: 'Admissões em json:', results: results });
            }
        });
    },

    obterAdmissaoPorId: async (req, res) => {
        const admissaoId = req.params.id;

        AdmissaoModel.obterAdmissaoPorId(admissaoId, (err, admissao) => {
            if (err) {
                res.status(500).json({ error: 'Erro ao buscar admissão por ID' });
            } else if (!admissao) {
                res.status(404).json({ message: 'Admissão não encontrada' });
            } else {
                res.status(200).json({ admissao });
            }
        });
    },

    excluirAdmissao: async (req, res) => {
        const admissaoId = req.params.id;

        AdmissaoModel.excluirAdmissao(admissaoId, (err, result) => {
            if (err) {
                res.status(500).json({ error: 'Erro ao excluir admissão' });
            } else {
                if (result) {
                    res.status(200).json({ message: 'Admissão excluída com sucesso' });
                } else {
                    res.status(404).json({ message: 'Admissão não encontrada' });
                }
            }
        });
    },

};

export default AdmissaoController;
