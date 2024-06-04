import SociedadeInternaModel from '../models/SociedadeInternaModel.js'



const SociedadeInternaController = {

    inserirSociedadeInterna: async (req, res) => {
        const {
            nome_sociedade,
            foto_sociedade
        } = await req.body;
            // Criação de novo objeto do model 
            const novosSociedadeInterna = new SociedadeInternaModel(
                nome_sociedade,
                foto_sociedade
            );
            // Uso da função criada no model
            SociedadeInternaModel.adicionarSociedadeInterna(novosSociedadeInterna, (error, SociedadeInternaId) => {
                if (error) {
                    res.status(500).json({ error: 'Erro ao inserir Sociedade Interna' });
                } else {
                    res.status(201).json({ message: 'Sociedade Interna inserido com sucesso', SociedadeInternaId: SociedadeInternaId });
                }
            });
    },

    listarTodasSociedadesInternas:  async (req, res) => {
        SociedadeInternaModel.listarTodasSociedadesInternas((error, results) => {
            if (error) {
                res.status(500).json({ error: 'Erro na requisição das Sociedades Internas' });
            } else {
                res.status(201).json({ message: 'Sociedades Internas em json:', results: results });
            }
        });
    },

    obterSociedadeInternaPorId: async (req, res) => {
        const SociedadeInternaId = req.params.id;
    
        SociedadeInternaModel.obterSociedadePorId(SociedadeInternaId, (err, SociedadeInterna) => {
            if (err) {
                res.status(500).json({ error: 'Erro ao buscar Sociedade Interna por ID' });
            } else if (!membro) {
                res.status(404).json({ message: 'Sociedade Interna não encontrada' });
            } else {
                res.status(200).json({ SociedadeInterna: SociedadeInterna });
            }
        });
    },
    

    atualizarSociedadeInterna: async (req, res) => {
        const SociedadeInternaId = req.params.id;
        const novosDadosSociedadeInterna = req.body; // Dados atualizados do membro
    
        SociedadeInternaModel.atualizarSociedadeInterna(SociedadeInternaId, novosDadosSociedadeInterna, (err, result) => {
            if (err) {
                res.status(500).json({ error: 'Erro ao atualizar Sociedade Interna' });
            } else {
                if (result) {
                    res.status(200).json({ message: 'Sociedade Interna atualizada com sucesso', LinesAffected: result });
                } else {
                    res.status(404).json({ message: 'Sociedade Interna não encontrado' });
                }
            }
        });
    },

    excluirSociedadeInterna: async (req, res) => {
        const SociedadeInternaId = req.params.id;
    
        SociedadeInternaModel.excluirSociedadeInterna(SociedadeInternaId, (err, result) => {
            if (err) {
                res.status(500).json({ error: 'Erro ao excluir Sociedade Interna' });
            } else {
                if (result) {
                    res.status(200).json({ message: 'Sociedade Interna excluída com sucesso' });
                } else {
                    res.status(404).json({ message: 'Sociedade Interna não encontrado' });
                }
            }
        });
    },
    
    
};

export default SociedadeInternaController;
