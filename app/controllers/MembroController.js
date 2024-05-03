import Model from '../models/MembroModel.js'

//Membro Controller é um objeto que contém várias propriedades, onde cada propriedade é uma função
const MembroController = {

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
        const novoMembro = new Model(
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
            foto_membro
        );

        //Uso da função criada no model
        Model.adicionarMembro(novoMembro,(error, memberId) =>{
            if (error){
                res.status(500).json({error:'Erro ao inserir membro'});
            } else {
                res.status(201).json({ message: 'Membro inserido com sucesso', memberId: memberId });
            }
        });
    },

    listarTodosMembros: (req, res) => {
        Model.listarTodosMembros((error,results) =>{
            if (error){
                res.status(500).json({error: 'Erro na requisição dos membros'});
            } else {
                const membros = results.map(row => new Model(row.id_membro, row.nome, row.comungante, row.data_nascimento, row.nome_pai, row.nome_mae, row.sexo, row.escolaridade, row.profissao, row.numero_de_rol, row.email, row.telefone, row.celular, row.foto_membro));
                res.status(201).json({message: 'Membros em json:',membros})
            }
        })
    },

};

export default MembroController;