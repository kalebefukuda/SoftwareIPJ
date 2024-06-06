import Batismo from '../models/BatismoModel.js';

const BatismoController = {
    adicionarBatismo: (req, res) => {
        const batismo = req.body;

        Batismo.adicionarBatismo(batismo, (error, results) => {
            if (error) {
                res.status(500).json({ error: 'Erro ao adicionar batismo' });
            } else {
                res.status(201).json({ message: 'Batismo adicionado com sucesso', data: results });
            }
        });
    },

    listarTodosBatismos: (req, res) => {
        Batismo.listarTodosBatismos((error, results) => {
            if (error) {
                res.status(500).json({ error: 'Erro ao buscar batismos' });
            } else {
                res.status(200).json({ message: 'Lista de batismos', data: results });
            }
        });
    },

    obterBatismoPorId: (req, res) => {
        const id = req.params.id;

        Batismo.obterBatismoPorId(id, (error, batismo) => {
            if (error) {
                res.status(500).json({ error: 'Erro ao buscar batismo por ID' });
            } else if (!batismo) {
                res.status(404).json({ message: 'Batismo não encontrado' });
            } else {
                res.status(200).json({ message: 'Batismo encontrado', data: batismo });
            }
        });
    },

    atualizarBatismo: (req, res) => {
        const id = req.params.id;
        const novosDados = req.body;

        Batismo.atualizarBatismo(id, novosDados, (error, success) => {
            if (error) {
                res.status(500).json({ error: 'Erro ao atualizar batismo' });
            } else if (!success) {
                res.status(404).json({ message: 'Batismo não encontrado para atualização' });
            } else {
                res.status(200).json({ message: 'Batismo atualizado com sucesso' });
            }
        });
    },

    excluirBatismo: (req, res) => {
        const id = req.params.id;

        Batismo.excluirBatismo(id, (error, success) => {
            if (error) {
                res.status(500).json({ error: 'Erro ao excluir batismo' });
            } else if (!success) {
                res.status(404).json({ message: 'Batismo não encontrado para exclusão' });
            } else {
                res.status(200).json({ message: 'Batismo excluído com sucesso' });
            }
        });
    }
};

export default BatismoController;
