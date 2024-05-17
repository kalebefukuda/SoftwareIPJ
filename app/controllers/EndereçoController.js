import Model from '../models/EndereçoModel.js';

const EndereçoController = {


    inserirEndereço: async (req,res) => {
        const{
            id_membro,
            cep,
            endereco,
            bairro,
            complemento,
            cidade,
            estado,
            local_residencia,
            local_nascimento,
            estado_nascimento
        } = await req.body;


        const novoEndereço = new Model(
            id_membro,
            cep,
            endereco,
            bairro,
            complemento,
            cidade,
            estado,
            local_residencia,
            local_nascimento,
            estado_nascimento
        );

        Model.adicionarEndereço(novoEndereço, (error, result) => {
            if (error) {
                res.status(500).json({ error: 'Erro ao inserir membro' });
            } else {
                res.status(201).json({ message: 'Membro inserido com sucesso', result: result });
            }
        });

    }
}


export default EndereçoController;