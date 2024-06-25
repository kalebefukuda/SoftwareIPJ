import MembroModel from '../models/MembroModel.js'
import moment from 'moment';

const MembroController = {

    inserirMembro: async (req, res) => {
        try {
            const {
                nome,
                comungante,
                data_nascimento,
                nome_pai,
                nome_mae,
                sexo,
                escolaridade,
                profissao,
                numero_de_rol,
                email,
                telefone,
                celular,
                foto_membro,
                estado_civil
            } = req.body;

            // Criação de novo objeto do model
            const novoMembro = new MembroModel(
                nome,
                comungante,
                data_nascimento,
                nome_pai,
                nome_mae,
                sexo,
                escolaridade,
                profissao,
                numero_de_rol,
                email,
                limparNumeroTelefone(telefone), // Pode lançar erro
                limparNumeroTelefone(celular),  // Pode lançar erro
                foto_membro,
                estado_civil
            );

            // Uso da função criada no model
            MembroModel.adicionarMembro(novoMembro, (error, memberId) => {
                if (error) {
                    res.status(500).json({ error: 'Erro ao inserir membro' });
                } else {
                    res.status(201).json({ message: 'Membro inserido com sucesso', memberId: memberId });
                }
            });
        } catch (error) {
            console.error('Erro ao inserir membro:', error.message);
            res.status(400).json({ error: error.message });
        }
    },

    listarTodosMembros: async (req, res) => {
        MembroModel.listarTodosMembros((error, results) => {
            if (error) {
                res.status(500).json({ error: 'Erro na requisição dos membros' });
            } else {
                res.status(201).json({ message: 'Membros em json:', results: results });
            }
        });
    },

    obterMembroPorId: async (req, res) => {
        const memberId = req.params.id;

        MembroModel.obterMembroPorId(memberId, (err, membro) => {
            if (err) {
                res.status(500).json({ error: 'Erro ao buscar membro por ID' });
            } else if (!membro) {
                res.status(404).json({ message: 'Membro não encontrado' });
            } else {
                res.status(200).json({ membro });
            }
        });
    },

    atualizarMembro: async (req, res) => {
        const memberId = req.params.id;
        const novosDadosMembro = req.body; // Dados atualizados do membro

        MembroModel.atualizarMembro(memberId, novosDadosMembro, (err, result) => {
            if (err) {
                res.status(500).json({ error: 'Erro ao atualizar membro' });
            } else {
                if (result) {
                    res.status(200).json({ message: 'Membro atualizado com sucesso', LinesAffected: result });
                } else {
                    res.status(404).json({ message: 'Membro não encontrado' });
                }
            }
        });
    },

    excluirMembro: async (req, res) => {
        const memberId = req.params.id;

        MembroModel.excluirMembro(memberId, (err, result) => {
            if (err) {
                res.status(500).json({ error: 'Erro ao excluir membro' });
            } else {
                if (result) {
                    res.status(200).json({ message: 'Membro excluído com sucesso' });
                } else {
                    res.status(404).json({ message: 'Membro não encontrado' });
                }
            }
        });
    },
};

// FUNÇÕES DE VERIFICAÇÃO OU CONVERSÃO


function limparNumeroTelefone(numero) {
    if (numero.length < 10 || numero.length > 14) {
        // Lança um erro se o formato do número estiver incorreto
        throw new Error('Formato do número errado');
    }

    // Remove parênteses, espaços, hifens e outros caracteres não numéricos
    return numero.replace(/[^\d]/g, '');
}

export default MembroController;
