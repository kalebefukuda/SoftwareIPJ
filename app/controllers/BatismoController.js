import Batismo from '../models/BatismoModel.js';

const BatismoController = {
    inserirBatismo: async (req, res) => {
        const { id_membro, data_batismo, nome_oficiante } = req.body;

        const novoBatismo = new Batismo(
            id_membro,
            data_batismo,
            nome_oficiante
        );

        Batismo.adicionarBatismo(novoBatismo, (error, result) => {
            if (error) {
                res.status(500).json({ error: 'Erro ao inserir batismo' });
            } else {
                res.status(201).json({ message: 'Batismo inserido com sucesso', result });
            }
        });
    },

    listarTodosBatismos: async (req, res) => {
        Batismo.listarTodosBatismos((error, results) => {
            if (error) {
                res.status(500).json({ error: 'Erro na requisição dos batismos' });
            } else {
                res.status(200).json(results);
            }
        });
    }
};

export default BatismoController;
