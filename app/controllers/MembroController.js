const Model = require('../models/MembroModel');

//Membro Controller é um objeto que contém várias propriedades, onde cada propriedade é uma função
export const MembroController = {

    inserirMembro: (req, res) => {
        const{
            id_membro,
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
        } = req.body; //Extrair os dados do front pela requisição

        
        //Criação de novo objeto do model
        const novoMembro = new Model.Membro(id_membro, nome, comungante, data_nascimento, nome_pai, nome_mae, sexo, escolaridade, profissao, numero_de_rol, email, telefone, celular, foto_membro);
        

        //Uso da função criada no model
        Model.Membro.adicionarMembro(novoMembro,(error, memberId) =>{
            if (error){
                res.status(500).json({error:'Erro ao inserir membro'});
            } else {
                res.status(201).json({ message: 'Membro inserido com sucesso', memberId: result });
            }
        });
    },

    listarTodos: (req, res) => {
        
    },

};
