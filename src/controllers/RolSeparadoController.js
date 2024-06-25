import RolSeparadoModel from '../models/RolSeparadoModel.js';

const RolSeparadoController = {

    inserirRolSeparado: async (req, res) => {
        const {
            data_rol_separado,
            ata_rol_separado,
            casamento,
            disciplina,
            data_disciplina,
            ata_disciplina,
            id_membro
        } = await req.body;

        const novoRolSeparado = new RolSeparadoModel(
            data_rol_separado,
            ata_rol_separado,
            casamento,
            disciplina,
            data_disciplina,
            ata_disciplina,
            id_membro
        );

        RolSeparadoModel.adicionarRolSeparado(novoRolSeparado, (error, rolSeparadoId) => {
            if (error) {
                res.status(500).json({ error: 'Erro ao inserir rol separado' });
            } else {
                res.status(201).json({ message: 'Rol separado inserido com sucesso', rolSeparadoId: rolSeparadoId });
            }
        });
    },

    listarTodosRolSeparado: async (req, res) => {
        RolSeparadoModel.listarTodosRolSeparado((error, results) => {
            if (error) {
                res.status(500).json({ error: 'Erro na requisição dos rols separados' });
            } else {
                res.status(201).json({ message: 'Rols separados em json:', results: results });
            }
        });
    },

    obterRolSeparadoPorId: async (req, res) => {
        const rolSeparadoId = req.params.id;

        RolSeparadoModel.obterRolSeparadoPorId(rolSeparadoId, (err, rolSeparado) => {
            if (err) {
                res.status(500).json({ error: 'Erro ao buscar rol separado por ID' });
            } else if (!rolSeparado) {
                res.status(404).json({ message: 'Rol separado não encontrado' });
            } else {
                res.status(200).json({ rolSeparado });
            }
        });
    },

    atualizarRolSeparado: async (req, res) => {
        const rolSeparadoId = req.params.id;
        const novosDadosRolSeparado = req.body;

        RolSeparadoModel.atualizarRolSeparado(rolSeparadoId, novosDadosRolSeparado, (err, result) => {
            if (err) {
                res.status(500).json({ error: 'Erro ao atualizar rol separado' });
            } else {
                if (result) {
                    res.status(200).json({ message: 'Rol separado atualizado com sucesso', LinesAffected: result });
                } else {
                    res.status(404).json({ message: 'Rol separado não encontrado' });
                }
            }
        });
    },

    excluirRolSeparado: async (req, res) => {
        const rolSeparadoId = req.params.id;

        RolSeparadoModel.excluirRolSeparado(rolSeparadoId, (err, result) => {
            if (err) {
                res.status(500).json({ error: 'Erro ao excluir rol separado' });
            } else {
                if (result) {
                    res.status(200).json({ message: 'Rol separado excluído com sucesso' });
                } else {
                    res.status(404).json({ message: 'Rol separado não encontrado' });
                }
            }
        });
    },

};

export default RolSeparadoController;
