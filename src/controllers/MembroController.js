import connect from '../../config/Connection.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const membroController = {};

const parseDateOrNull = (date) => {
    return date ? date : null;
};

const parseIntOrNull = (value) => {
    return value ? parseInt(value, 10) : null;
};

// Listar membros
membroController.list = async (req, res) => {
    let connection;
    try {
        connection = await connect();
        const [rows] = await connection.query('SELECT * FROM MEMBRO;');
        // Transformar os dados para adicionar caminho da imagem padrão quando FOTO_MEMBRO for null
        const membros = rows.map(membro => {
            if (!membro.FOTO_MEMBRO) {
                membro.FOTO_MEMBRO = 'Ellipse.png'; // Define a imagem padrão com o caminho correto
            }
            return membro;
        });
        res.json(membros);
    } catch (error) {
        console.error('Erro ao listar membros:', error);
        res.status(500).json({ error: 'Erro ao listar membros' });
    } finally {
        if (connection) connection.release();
    }
};


// Buscar membros por nome
membroController.search = async (req, res) => {
    const query = req.query.query || '';
    let connection;

    try {
        connection = await connect();
        const sqlQuery = `
            SELECT M.ID_MEMBRO, M.NOME, M.NUMERO_DE_ROL, TIMESTAMPDIFF(YEAR, M.DATA_NASCIMENTO, CURDATE()) AS IDADE, M.FOTO_MEMBRO
            FROM MEMBRO M
            WHERE M.NOME LIKE ?`;

        const [rows] = await connection.query(sqlQuery, [`%${query}%`]);
        const basePath = '/uploads/';
        const membros = rows.map(membro => {
            if (!membro.FOTO_MEMBRO) {
                membro.FOTO_MEMBRO = 'Ellipse.png'; // Define a imagem padrão
            } else {
                membro.FOTO_MEMBRO = basePath + membro.FOTO_MEMBRO;
            }
            return membro;
        });

        res.json({ ok: true, data: membros });
    } catch (error) {
        console.error('Erro na busca:', error);
        res.status(500).json({ ok: false, error: 'Erro interno do servidor' });
    } finally {
        if (connection) connection.release();
    }
};

// Criar membro
membroController.create = async (req, res) => {
    let connection;
    try {
        console.log('Request Body:', req.body);
        console.log('Request Files:', req.files);

        connection = await connect();
        const {
            nome, comungante, dataNascimento, nomePai, nomeMae, sexo, escolaridade, profissao,
            numeroDeRol, email, telefone, celular, estadoCivil, endereco, bairro, complemento,
            cidade, estado, localResidencia, localNascimento, estadoNascimento, cep, dataBatismo,
            oficianteBatismo, dataProfissaoFe, oficianteProfissaoFe, dataAdmissao, formaAdmissao,
            ataAdmissao, dataDemissao, formaDemissao, ataDemissao, dataEleicaoDiacono,
            dataReeleicaoDiacono1, dataReeleicaoDiacono2, dataReeleicaoDiacono3, dataReeleicaoDiacono4,
            dataEleicaoPresbitero, dataReeleicaoPresbitero1, dataReeleicaoPresbitero2,
            dataReeleicaoPresbitero3, dataRolSeparado, ataRolSeparado, dataCasamento, disciplina,
            dataDisciplina, ataDisciplina
        } = req.body;

        let fotoMembro = null;
        if (req.files && req.files.fotoMembro) {
            const file = req.files.fotoMembro;
            const uploadDir = path.resolve(__dirname, '../../src/views/uploads');

            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }

            const fileName = `${Date.now()}-${file.name}`;
            const uploadPath = path.join(uploadDir, fileName);

            await file.mv(uploadPath);
            fotoMembro = `uploads/${fileName}`;
        }

        const sqlMembro = 'INSERT INTO MEMBRO (NOME, COMUNGANTE, DATA_NASCIMENTO, NOME_PAI, NOME_MAE, SEXO, ESCOLARIDADE, PROFISSAO, NUMERO_DE_ROL, EMAIL, TELEFONE, CELULAR, FOTO_MEMBRO, ESTADO_CIVIL) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const valuesMembro = [
            nome, parseInt(comungante), dataNascimento, nomePai, nomeMae, sexo, escolaridade, profissao, numeroDeRol, email, telefone, celular, fotoMembro, estadoCivil
        ];

        const [resultMembro] = await connection.query(sqlMembro, valuesMembro);
        const idMembro = resultMembro.insertId;

        const sqlEndereco = 'INSERT INTO ENDERECO (ID_MEMBRO, CEP, ENDERECO, BAIRRO, COMPLEMENTO, CIDADE, ESTADO, LOCAL_RESIDENCIA, LOCAL_NASCIMENTO, ESTADO_NASCIMENTO) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';
        const valuesEndereco = [
            idMembro, cep, endereco, bairro, complemento, cidade, estado, localResidencia,
            localNascimento, estadoNascimento
        ];

        await connection.query(sqlEndereco, valuesEndereco);

        const sqlEleicaoDiacono = 'INSERT INTO ELEICAO_DIACONO (DATA_ELEICAO, REELEICAO_1, REELEICAO_2, REELEICAO_3, REELEICAO_4, ID_MEMBRO) VALUES (?, ?, ?, ?, ?, ?);';
        const valuesEleicaoDiacono = [
            parseDateOrNull(dataEleicaoDiacono), parseDateOrNull(dataReeleicaoDiacono1),
            parseDateOrNull(dataReeleicaoDiacono2), parseDateOrNull(dataReeleicaoDiacono3),
            parseDateOrNull(dataReeleicaoDiacono4), idMembro
        ];

        await connection.query(sqlEleicaoDiacono, valuesEleicaoDiacono);

        const sqlEleicaoPresbitero = 'INSERT INTO ELEICAO_PRESBITERO (DATA_ELEICAO_PRESBITERO_1, DATA_ELEICAO_PRESBITERO_2, DATA_ELEICAO_PRESBITERO_3, DATA_ELEICAO_PRESBITERO_4, ID_MEMBRO) VALUES (?, ?, ?, ?, ?);';
        const valuesEleicaoPresbitero = [
            parseDateOrNull(dataEleicaoPresbitero), parseDateOrNull(dataReeleicaoPresbitero1),
            parseDateOrNull(dataReeleicaoPresbitero2), parseDateOrNull(dataReeleicaoPresbitero3),
            idMembro
        ];

        await connection.query(sqlEleicaoPresbitero, valuesEleicaoPresbitero);

        const sqlBatismo = 'INSERT INTO BATISMO (DATA_BATISMO, NOME_OFICIANTE, ID_MEMBRO) VALUES (?, ?, ?);';
        const valuesBatismo = [parseDateOrNull(dataBatismo), oficianteBatismo, idMembro];

        await connection.query(sqlBatismo, valuesBatismo);

        const sqlProfissaoDeFe = 'INSERT INTO PROFISSAO_DE_FE (DATA_PROFISSAO_DE_FE, NOME_OFICIANTE, ID_MEMBRO) VALUES (?, ?, ?);';
        const valuesProfissaoDeFe = [
            parseDateOrNull(dataProfissaoFe), oficianteProfissaoFe, idMembro
        ];

        await connection.query(sqlProfissaoDeFe, valuesProfissaoDeFe);

        const sqlAdmissao = 'INSERT INTO ADMISSAO (DATA_ADMISSAO, FORMA_ADMISSAO, NUMERO_ATA, ID_MEMBRO) VALUES (?, ?, ?, ?);';
        const valuesAdmissao = [
            parseDateOrNull(dataAdmissao), formaAdmissao, parseIntOrNull(ataAdmissao), idMembro
        ];

        await connection.query(sqlAdmissao, valuesAdmissao);

        const sqlDemissao = 'INSERT INTO DEMISSAO (DATA_DEMISSAO, FORMA_DEMISSAO, NUMERO_ATA, ID_MEMBRO) VALUES (?, ?, ?, ?);';
        const valuesDemissao = [
            parseDateOrNull(dataDemissao), formaDemissao, parseIntOrNull(ataDemissao), idMembro
        ];

        await connection.query(sqlDemissao, valuesDemissao);

        const sqlRolSeparado = 'INSERT INTO ROL_SEPARADO (DATA_ROL_SEPARADO, ATA_ROL_SEPARADO, CASAMENTO, DISPLINA, DATA_DISCIPLINA, ATA_DISCIPLINA, ID_MEMBRO) VALUES (?, ?, ?, ?, ?, ?, ?);';
        const valuesRolSeparado = [
            parseDateOrNull(dataRolSeparado), parseIntOrNull(ataRolSeparado), parseDateOrNull(dataCasamento),
            disciplina, parseDateOrNull(dataDisciplina), parseIntOrNull(ataDisciplina), idMembro
        ];

        await connection.query(sqlRolSeparado, valuesRolSeparado);

        res.status(201).json({ message: 'Membro criado com sucesso' });
    } catch (error) {
        console.error('Erro ao criar membro:', error);
        res.status(500).json({ error: 'Erro ao criar membro' });
    } finally {
        if (connection) connection.release();
    }
};

// Atualizar membro
membroController.update = async (req, res) => {
    let connection;
    try {
        connection = await connect();
        const { id } = req.params;
        const {
            nome, comungante, dataNascimento, nomePai, nomeMae, sexo, escolaridade, profissao,
            numeroDeRol, email, telefone, celular, estadoCivil, endereco, bairro, complemento,
            cidade, estado, localResidencia, localNascimento, estadoNascimento, cep, dataBatismo,
            oficianteBatismo, dataProfissaoFe, oficianteProfissaoFe, dataAdmissao, formaAdmissao,
            ataAdmissao, dataDemissao, formaDemissao, ataDemissao, dataEleicaoDiacono,
            dataReeleicaoDiacono1, dataReeleicaoDiacono2, dataReeleicaoDiacono3, dataReeleicaoDiacono4,
            dataEleicaoPresbitero, dataReeleicaoPresbitero1, dataReeleicaoPresbitero2,
            dataReeleicaoPresbitero3, dataRolSeparado, ataRolSeparado, dataCasamento, disciplina,
            dataDisciplina, ataDisciplina
        } = req.body;

        let fotoMembro = req.body.fotoMembroPath;

        if (req.files && req.files.fotoMembro) {
            const file = req.files.fotoMembro;
            const uploadDir = path.resolve(__dirname, '../../src/views/uploads');

            if (!fs.existsSync(uploadDir)) {
                return res.status(500).json({ error: 'Diretório de upload não existe' });
            }

            const fileName = `${Date.now()}-${file.name}`;
            const uploadPath = path.join(uploadDir, fileName);

            await file.mv(uploadPath);
            fotoMembro = `uploads/${fileName}`;
        }

        const sqlMembro = `
            UPDATE MEMBRO SET 
                NOME = ?, COMUNGANTE = ?, DATA_NASCIMENTO = ?, NOME_PAI = ?, NOME_MAE = ?, SEXO = ?, 
                ESCOLARIDADE = ?, PROFISSAO = ?, NUMERO_DE_ROL = ?, EMAIL = ?, TELEFONE = ?, CELULAR = ?, 
                ESTADO_CIVIL = ?, FOTO_MEMBRO = ?
            WHERE ID_MEMBRO = ?;`;

        const valuesMembro = [
            nome, parseInt(comungante), dataNascimento, nomePai, nomeMae, sexo, escolaridade,
            profissao, numeroDeRol, email, telefone, celular, estadoCivil, fotoMembro, id
        ];

        await connection.query(sqlMembro, valuesMembro);

        const sqlEndereco = `
            UPDATE ENDERECO SET 
                CEP = ?, ENDERECO = ?, BAIRRO = ?, COMPLEMENTO = ?, CIDADE = ?, ESTADO = ?, 
                LOCAL_RESIDENCIA = ?, LOCAL_NASCIMENTO = ?, ESTADO_NASCIMENTO = ?
            WHERE ID_MEMBRO = ?;`;

        const valuesEndereco = [
            cep, endereco, bairro, complemento, cidade, estado, localResidencia, localNascimento,
            estadoNascimento, id
        ];

        await connection.query(sqlEndereco, valuesEndereco);

        const sqlEleicaoDiacono = `
            UPDATE ELEICAO_DIACONO SET 
                DATA_ELEICAO = ?, REELEICAO_1 = ?, REELEICAO_2 = ?, REELEICAO_3 = ?, REELEICAO_4 = ?
            WHERE ID_MEMBRO = ?;`;

        const valuesEleicaoDiacono = [
            parseDateOrNull(dataEleicaoDiacono), parseDateOrNull(dataReeleicaoDiacono1),
            parseDateOrNull(dataReeleicaoDiacono2), parseDateOrNull(dataReeleicaoDiacono3),
            parseDateOrNull(dataReeleicaoDiacono4), id
        ];

        await connection.query(sqlEleicaoDiacono, valuesEleicaoDiacono);

        const sqlEleicaoPresbitero = `
            UPDATE ELEICAO_PRESBITERO SET 
                DATA_ELEICAO_PRESBITERO_1 = ?, DATA_ELEICAO_PRESBITERO_2 = ?, DATA_ELEICAO_PRESBITERO_3 = ?, 
                DATA_ELEICAO_PRESBITERO_4 = ?
            WHERE ID_MEMBRO = ?;`;

        const valuesEleicaoPresbitero = [
            parseDateOrNull(dataEleicaoPresbitero), parseDateOrNull(dataReeleicaoPresbitero1),
            parseDateOrNull(dataReeleicaoPresbitero2), parseDateOrNull(dataReeleicaoPresbitero3), id
        ];

        await connection.query(sqlEleicaoPresbitero, valuesEleicaoPresbitero);

        const sqlBatismo = `
            UPDATE BATISMO SET 
                DATA_BATISMO = ?, NOME_OFICIANTE = ?
            WHERE ID_MEMBRO = ?;`;

        const valuesBatismo = [parseDateOrNull(dataBatismo), oficianteBatismo, id];

        await connection.query(sqlBatismo, valuesBatismo);

        const sqlProfissaoDeFe = `
            UPDATE PROFISSAO_DE_FE SET 
                DATA_PROFISSAO_DE_FE = ?, NOME_OFICIANTE = ?
            WHERE ID_MEMBRO = ?;`;

        const valuesProfissaoDeFe = [
            parseDateOrNull(dataProfissaoFe), oficianteProfissaoFe, id
        ];

        await connection.query(sqlProfissaoDeFe, valuesProfissaoDeFe);

        const sqlAdmissao = `
            UPDATE ADMISSAO SET 
                DATA_ADMISSAO = ?, FORMA_ADMISSAO = ?, NUMERO_ATA = ?
            WHERE ID_MEMBRO = ?;`;

        const valuesAdmissao = [
            parseDateOrNull(dataAdmissao), formaAdmissao, parseIntOrNull(ataAdmissao), id
        ];

        await connection.query(sqlAdmissao, valuesAdmissao);

        const sqlDemissao = `
            UPDATE DEMISSAO SET 
                DATA_DEMISSAO = ?, FORMA_DEMISSAO = ?, NUMERO_ATA = ?
            WHERE ID_MEMBRO = ?;`;

        const valuesDemissao = [
            parseDateOrNull(dataDemissao), formaDemissao, parseIntOrNull(ataDemissao), id
        ];

        await connection.query(sqlDemissao, valuesDemissao);

        const sqlRolSeparado = `
            UPDATE ROL_SEPARADO SET 
                DATA_ROL_SEPARADO = ?, ATA_ROL_SEPARADO = ?, CASAMENTO = ?, DISPLINA = ?, 
                DATA_DISCIPLINA = ?, ATA_DISCIPLINA = ?
            WHERE ID_MEMBRO = ?;`;

        const valuesRolSeparado = [
            parseDateOrNull(dataRolSeparado), parseIntOrNull(ataRolSeparado), parseDateOrNull(dataCasamento),
            disciplina, parseDateOrNull(dataDisciplina), parseIntOrNull(ataDisciplina), id
        ];

        await connection.query(sqlRolSeparado, valuesRolSeparado);

        res.json({ message: 'Membro atualizado com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar membro:', error);
        res.status(500).json({ error: 'Erro ao atualizar membro' });
    } finally {
        if (connection) connection.release();
    }
};


// Adicione esta função ao seu controlador MembroController.js
membroController.getMembroById = async (req, res) => {
    let connection;
    try {
        connection = await connect();
        const { id } = req.params;
        
        const [membroRows] = await connection.query('SELECT * FROM MEMBRO WHERE ID_MEMBRO = ?;', [id]);
        const [enderecoRows] = await connection.query('SELECT * FROM ENDERECO WHERE ID_MEMBRO = ?;', [id]);
        const [eleicaoDiaconoRows] = await connection.query('SELECT * FROM ELEICAO_DIACONO WHERE ID_MEMBRO = ?;', [id]);
        const [eleicaoPresbiteroRows] = await connection.query('SELECT * FROM ELEICAO_PRESBITERO WHERE ID_MEMBRO = ?;', [id]);
        const [batismoRows] = await connection.query('SELECT * FROM BATISMO WHERE ID_MEMBRO = ?;', [id]);
        const [profissaoDeFeRows] = await connection.query('SELECT * FROM PROFISSAO_DE_FE WHERE ID_MEMBRO = ?;', [id]);
        const [admissaoRows] = await connection.query('SELECT * FROM ADMISSAO WHERE ID_MEMBRO = ?;', [id]);
        const [demissaoRows] = await connection.query('SELECT * FROM DEMISSAO WHERE ID_MEMBRO = ?;', [id]);
        const [rolSeparadoRows] = await connection.query('SELECT * FROM ROL_SEPARADO WHERE ID_MEMBRO = ?;', [id]);

        if (membroRows.length === 0) {
            return res.status(404).json({ error: 'Membro não encontrado' });
        }

        const membro = membroRows[0];
        const endereco = enderecoRows[0] || {};
        const eleicaoDiacono = eleicaoDiaconoRows[0] || {};
        const eleicaoPresbitero = eleicaoPresbiteroRows[0] || {};
        const batismo = batismoRows[0] || {};
        const profissaoDeFe = profissaoDeFeRows[0] || {};
        const admissao = admissaoRows[0] || {};
        const demissao = demissaoRows[0] || {};
        const rolSeparado = rolSeparadoRows[0] || {};

        res.json({
            ...membro,
            ...endereco,
            ...eleicaoDiacono,
            ...eleicaoPresbitero,
            ...batismo,
            ...profissaoDeFe,
            ...admissao,
            ...demissao,
            ...rolSeparado
        });
    } catch (error) {
        console.error('Erro ao obter membro:', error);
        res.status(500).json({ error: 'Erro ao obter membro' });
    } finally {
        if (connection) connection.release();
    }
};


// Deletar membro
membroController.delete = async (req, res) => {
    let connection;
    try {
        connection = await connect();
        const { id } = req.params;

        // Deletar registros associados nas tabelas relacionadas primeiro
        await connection.query('DELETE FROM ENDERECO WHERE ID_MEMBRO = ?;', [id]);
        await connection.query('DELETE FROM ELEICAO_DIACONO WHERE ID_MEMBRO = ?;', [id]);
        await connection.query('DELETE FROM ELEICAO_PRESBITERO WHERE ID_MEMBRO = ?;', [id]);
        await connection.query('DELETE FROM BATISMO WHERE ID_MEMBRO = ?;', [id]);
        await connection.query('DELETE FROM PROFISSAO_DE_FE WHERE ID_MEMBRO = ?;', [id]);
        await connection.query('DELETE FROM ADMISSAO WHERE ID_MEMBRO = ?;', [id]);
        await connection.query('DELETE FROM DEMISSAO WHERE ID_MEMBRO = ?;', [id]);
        await connection.query('DELETE FROM ROL_SEPARADO WHERE ID_MEMBRO = ?;', [id]);
        await connection.query('DELETE FROM MEMBRO_SOCIEDADE WHERE ID_MEMBRO = ?;', [id]);

        // Deletar o membro
        await connection.query('DELETE FROM MEMBRO WHERE ID_MEMBRO = ?;', [id]);

        res.json({ message: 'Membro deletado com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar membro:', error);
        res.status(500).json({ error: 'Erro ao deletar membro' });
    } finally {
        if (connection) connection.release();
    }
};


export { membroController };
