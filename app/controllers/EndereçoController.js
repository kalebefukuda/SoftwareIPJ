import EnderecoModel from '../models/EndereçoModel.js';

const EnderecoController = {

    inserirEndereco: async (req, res) => {
        const {
            id_membro,
            cep,
            endereco,
            bairro,
            complemento,
            cidade,
            estado,
            local_residencia,
            local_nascimento,
            estado_nascimento,
        } = req.body;
        
        const novoEndereco = new EnderecoModel(
            id_membro,
            cep,
            endereco,
            bairro,
            complemento,
            cidade,
            estado,
            local_residencia,
            local_nascimento,
            estado_nascimento,
        );

        EnderecoModel.adicionarEndereco(novoEndereco, (error, result) => {
            if (error) {
                res.status(500).json({ mensagem: 'Erro ao inserir endereço'});
            } else {
                res.status(201).json({ message: 'Endereço inserido com sucesso', enderecoId: result.insertId });
            }
        });
    },

    listarTodosEnderecos: async (req, res) => {
        EnderecoModel.listarTodosEnderecos((error, results) => {
            if (error) {
                res.status(500).json({ error: 'Erro na requisição dos endereços' });
            } else {
                res.status(200).json({ message: 'Endereços em JSON:', results: results });
            }
        });
    },

    obterEnderecoPorId: async (req, res) => {
        const id = req.params.id; 
        const porMembro = req.query.porMembro === 'true';  // Verifica se o parâmetro porMembro é 'true'
    
        EnderecoModel.obterEnderecoPorId(id, porMembro, (error, endereco) => {
            if (error) {
                res.status(500).json({ error: 'Erro ao buscar endereço por ID' });
            } else if (!endereco) {
                res.status(404).json({ message: 'Endereço não encontrado' });
            } else {
                res.status(200).json({ endereco });
            }
        });
    },
    

    atualizarEndereco: async (req, res) => {
        const id = req.params;
        const novosDados = req.body;

        EnderecoModel.atualizarEndereco(id, novosDados, (error, result) => {
            if (error) {
                res.status(500).json({ error: 'Erro ao atualizar endereço' });
            } else {
                if (result) {
                    res.status(200).json({ message: 'Endereço atualizado com sucesso', LinesAffected: result });
                } else {
                    res.status(404).json({ message: 'Endereço não encontrado' });
                }
            }
        });
    },

    excluirEndereco: async (req, res) => {
        const id = req.params;

        EnderecoModel.excluirEndereco(id, (error, result) => {
            if (error) {
                res.status(500).json({ mensagem: 'Erro ao excluir endereço', error: error  });
            } else {
                if (result) {
                    res.status(200).json({ message: 'Endereço excluído com sucesso' });
                } else {
                    res.status(404).json({ message: 'Endereço não encontrado' });
                }
            }
        });
    },

};

export default EnderecoController;
