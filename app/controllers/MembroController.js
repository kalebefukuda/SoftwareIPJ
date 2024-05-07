import Model from '../models/MembroModel.js'
import moment from 'moment';
import fetchBlob from 'fetch-blob';

const MembroController = {

    inserirMembro: async (req, res) => {
        const {
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
        } = await req.body;

            // Conversão imagem
            const blob = await urlToBlob(foto_membro);

            // Verificação de tipo de dados
            try
            {
                if (typeof id_membro !== 'number') {
                    throw new Error('O ID do membro deve ser um número.');
                }

                if (typeof nome !== 'string') {
                    throw new Error('O nome do membro deve ser uma string.');
                }

                if (typeof comungante !== 'boolean') {
                    throw new Error('O status de comungante deve ser um booleano.');
                }

                if (VerificaData(data_nascimento)) {
                    throw new Error('A data de nascimento é inválida.');
                }

                if (typeof nome_pai !== 'string') {
                    throw new Error('O nome do pai deve ser uma string.');
                }

                if (typeof nome_mae !== 'string') {
                    throw new Error('O nome da mãe deve ser uma string.');
                }

                if (typeof sexo !== 'string') {
                    throw new Error('O sexo deve ser uma string.');
                }

                if (typeof escolaridade !== 'string') {
                    throw new Error('A escolaridade deve ser uma string.');
                }

                if (typeof profissao !== 'string') {
                    throw new Error('A profissão deve ser uma string.');
                }

                if (typeof numero_de_rol !== 'number') {
                    throw new Error('O número de rol deve ser um número.');
                }

                if (typeof email !== 'string') {
                    throw new Error('O email deve ser uma string.');
                }

                if (typeof telefone !== 'string') {
                    throw new Error('O telefone deve ser uma string.');
                }

                if (typeof celular !== 'string') {
                    throw new Error('O celular deve ser uma string.');
                }

                if (!(blob instanceof Blob)) {
                    throw new Error('A foto do membro deve ser um Blob.');
                }
            }catch(error)
            {
                console.log(error);
            }
    
            // Criação de novo objeto do model 
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
                blob
            );

            // Uso da função criada no model
            Model.adicionarMembro(novoMembro, (error, memberId) => {
                if (error) {
                    res.status(500).json({ error: 'Erro ao inserir membro' });
                } else {
                    res.status(201).json({ message: 'Membro inserido com sucesso', memberId: memberId });
                }
            });
    },

    listarTodosMembros:  async (req, res) => {
        Model.listarTodosMembros((error, results) => {
            if (error) {
                res.status(500).json({ error: 'Erro na requisição dos membros' });
            } else {
                const membros = results.map(row => new Model(row.id_membro, row.nome, row.comungante, row.data_nascimento, row.nome_pai, row.nome_mae, row.sexo, row.escolaridade, row.profissao, row.numero_de_rol, row.email, row.telefone, row.celular, row.foto_membro));
                res.status(201).json({ message: 'Membros em json:', membros });
            }
        });
    },
};




//FUNÇÕES DE VERIFICAÇÃO OU CONVERSÃO

function VerificaData(data) {
    const dataNascimento = moment(data, 'YYYY-MM-DD');
    const dataAtual = moment();
    return dataNascimento.isAfter(dataAtual) || moment().diff(dataNascimento, 'years') > 100;
}

async function urlToBlob(imageUrl) {
    const response = await fetchBlob(imageUrl);
    return response.blob();
}

export default MembroController;
