import ProfissãodeFeModel from '../models/ProfissãodeFéModel.js'


const ProfissaoDeFeController = {

    inserirProfissaoDeFe: async (req, res) => {
        const {
            data_profissao_de_fe,
            nome_oficiante,
            id_membro,
        } = await req.body;
            // Criação de novo objeto do model 
            const novoProfissaoDeFe = new ProfissãodeFeModel(
                data_profissao_de_fe,
                nome_oficiante,
                id_membro,
            )
            // Uso da função criada no model
            ProfissãodeFeModel.adicionarProfissaoDeFe(novoProfissaoDeFe, (error, result) => {
                if (error) {
                    res.status(500).json({ error: 'Erro ao inserir Profissao de Fe' });
                } else {
                    res.status(201).json({ message: 'Profissao de Fe inserida com sucesso', result: result });
                }
            });
    },

    listarTodasProfissoesDeFe:  async (req, res) => {
        ProfissãodeFeModel.listarTodasPrifissoesDeFe((error, results) => {
            if (error) {
                res.status(500).json({ error: 'Erro na requisição das Profissoes de Fe' });
            } else {
                res.status(201).json({ message: 'Profissao de Fe em json:', results: results });
            }
        });
    },

    obterProfissaoDeFePorId: async (req, res) => {
        const ProfissaoDeFeId = req.params.id;
    
        ProfissãodeFeModel.obterProfissaoDeFePorId(ProfissaoDeFeId, (err, ProfissaoDeFe) => {
            if (err) {
                res.status(500).json({ error: 'Erro ao buscar ProfissaoDeFe por ID' });
            } else if (!ProfissaoDeFe) {
                res.status(404).json({ message: 'ProfissaoDeFeId não encontrada' });
            } else {
                res.status(200).json({ ProfissaoDeFe: ProfissaoDeFe });
            }
        });
    },
    

    atualizarProfissaoDeFe: async (req, res) => {
        const ProfissaoDeFeId = req.params.id;
        const novosDadosProfissaoDeFe = req.body; // Dados atualizados do membro
    
        ProfissãodeFeModel.atualizarProfissaoDeFe(ProfissaoDeFeId, novosDadosProfissaoDeFe, (err, result) => {
            if (err) {
                res.status(500).json({ error: 'Erro ao atualizar ProfissaoDeFe' });
            } else {
                if (result) {
                    res.status(200).json({ message: 'ProfissaoDeFeId atualizada com sucesso', LinesAffected: result });
                } else {
                    res.status(404).json({ message: 'ProfissaoDeFeId não encontrada' });
                }
            }
        });
    },

    excluirProfissaoDeFe: async (req, res) => {
        const ProfissaoDeFeId = req.params.id;
    
        ProfissãodeFeModel.excluirProfissaoDeFe(ProfissaoDeFeId, (err, result) => {
            if (err) {
                res.status(500).json({ error: 'Erro ao excluir ProfissaoDeFe' });
            } else {
                if (result) {
                    res.status(200).json({ message: 'ProfissaoDeFeId excluída com sucesso' });
                } else {
                    res.status(404).json({ message: 'ProfissaoDeFeId não encontrado' });
                }
            }
        });
    },
    
    
};



export default ProfissaoDeFeController;
