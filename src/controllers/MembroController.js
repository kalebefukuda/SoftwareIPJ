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
        res.json(rows);
    } catch (error) {
        console.error('Erro ao listar membros:', error);
        res.status(500).json({ error: 'Erro ao listar membros' });
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

        console.log('Parsed Request Body:', {
            nome, comungante, dataNascimento, nomePai, nomeMae, sexo, escolaridade, profissao,
            numeroDeRol, email, telefone, celular, estadoCivil, endereco, bairro, complemento,
            cidade, estado, localResidencia, localNascimento, estadoNascimento, cep, dataBatismo,
            oficianteBatismo, dataProfissaoFe, oficianteProfissaoFe, dataAdmissao, formaAdmissao,
            ataAdmissao, dataDemissao, formaDemissao, ataDemissao, dataEleicaoDiacono,
            dataReeleicaoDiacono1, dataReeleicaoDiacono2, dataReeleicaoDiacono3, dataReeleicaoDiacono4,
            dataEleicaoPresbitero, dataReeleicaoPresbitero1, dataReeleicaoPresbitero2,
            dataReeleicaoPresbitero3, dataRolSeparado, ataRolSeparado, dataCasamento, disciplina,
            dataDisciplina, ataDisciplina
        });

        let fotoMembro = null;
        if (req.files && req.files.fotoMembro) {
            const file = req.files.fotoMembro;
            const uploadDir = path.resolve(__dirname, '../../src/views/uploads'); // Caminho relativo ao diretório atual

            // Verificação da existência do diretório de uploads
            if (!fs.existsSync(uploadDir)) {
                return res.status(500).json({ error: 'Diretório de upload não existe' });
            }

            const fileName = `${Date.now()}-${file.name}`;
            const uploadPath = path.join(uploadDir, fileName); // Caminho ajustado para src/views/uploads

            console.log('Diretório de upload:', uploadDir);
            console.log('Caminho do upload:', uploadPath);

            await file.mv(uploadPath);
            fotoMembro = `/uploads/${fileName}`;
            console.log('Uploaded file path:', fotoMembro);
        }

        const sqlMembro = 'INSERT INTO MEMBRO (NOME, COMUNGANTE, DATA_NASCIMENTO, NOME_PAI, NOME_MAE, SEXO, ESCOLARIDADE, PROFISSAO, NUMERO_DE_ROL, EMAIL, TELEFONE, CELULAR, FOTO_MEMBRO, ESTADO_CIVIL) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const valuesMembro = [
            nome, parseInt(comungante), dataNascimento, nomePai, nomeMae, sexo, escolaridade, profissao, numeroDeRol, email, telefone, celular, fotoMembro, estadoCivil
        ];

        console.log('SQL Membro:', sqlMembro);
        console.log('Values Membro:', valuesMembro);

        const [resultMembro] = await connection.query(sqlMembro, valuesMembro);
        const idMembro = resultMembro.insertId;
        console.log('Inserted Member ID:', idMembro);

        const sqlEndereco = 'INSERT INTO ENDERECO (ID_MEMBRO, CEP, ENDERECO, BAIRRO, COMPLEMENTO, CIDADE, ESTADO, LOCAL_RESIDENCIA, LOCAL_NASCIMENTO, ESTADO_NASCIMENTO) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';
        const valuesEndereco = [
            idMembro, cep, endereco, bairro, complemento, cidade, estado, localResidencia,
            localNascimento, estadoNascimento
        ];

        console.log('SQL Endereco:', sqlEndereco);
        console.log('Values Endereco:', valuesEndereco);

        await connection.query(sqlEndereco, valuesEndereco);

        const sqlEleicaoDiacono = 'INSERT INTO ELEICAO_DIACONO (DATA_ELEICAO, REELEICAO_1, REELEICAO_2, REELEICAO_3, REELEICAO_4, ID_MEMBRO) VALUES (?, ?, ?, ?, ?, ?);';
        const valuesEleicaoDiacono = [
            parseDateOrNull(dataEleicaoDiacono), parseDateOrNull(dataReeleicaoDiacono1),
            parseDateOrNull(dataReeleicaoDiacono2), parseDateOrNull(dataReeleicaoDiacono3),
            parseDateOrNull(dataReeleicaoDiacono4), idMembro
        ];

        console.log('SQL Eleicao Diacono:', sqlEleicaoDiacono);
        console.log('Values Eleicao Diacono:', valuesEleicaoDiacono);

        await connection.query(sqlEleicaoDiacono, valuesEleicaoDiacono);

        const sqlEleicaoPresbitero = 'INSERT INTO ELEICAO_PRESBITERO (DATA_ELEICAO_PRESBITERO_1, DATA_ELEICAO_PRESBITERO_2, DATA_ELEICAO_PRESBITERO_3, DATA_ELEICAO_PRESBITERO_4, ID_MEMBRO) VALUES (?, ?, ?, ?, ?);';
        const valuesEleicaoPresbitero = [
            parseDateOrNull(dataEleicaoPresbitero), parseDateOrNull(dataReeleicaoPresbitero1),
            parseDateOrNull(dataReeleicaoPresbitero2), parseDateOrNull(dataReeleicaoPresbitero3),
            idMembro
        ];

        console.log('SQL Eleicao Presbitero:', sqlEleicaoPresbitero);
        console.log('Values Eleicao Presbitero:', valuesEleicaoPresbitero);

        await connection.query(sqlEleicaoPresbitero, valuesEleicaoPresbitero);

        const sqlBatismo = 'INSERT INTO BATISMO (DATA_BATISMO, NOME_OFICIANTE, ID_MEMBRO) VALUES (?, ?, ?);';
        const valuesBatismo = [parseDateOrNull(dataBatismo), oficianteBatismo, idMembro];

        console.log('SQL Batismo:', sqlBatismo);
        console.log('Values Batismo:', valuesBatismo);

        await connection.query(sqlBatismo, valuesBatismo);

        const sqlProfissaoDeFe = 'INSERT INTO PROFISSAO_DE_FE (DATA_PROFISSAO_DE_FE, NOME_OFICIANTE, ID_MEMBRO) VALUES (?, ?, ?);';
        const valuesProfissaoDeFe = [
            parseDateOrNull(dataProfissaoFe), oficianteProfissaoFe, idMembro
        ];

        console.log('SQL Profissao De Fe:', sqlProfissaoDeFe);
        console.log('Values Profissao De Fe:', valuesProfissaoDeFe);

        await connection.query(sqlProfissaoDeFe, valuesProfissaoDeFe);

        const sqlAdmissao = 'INSERT INTO ADMISSAO (DATA_ADMISSAO, FORMA_ADMISSAO, NUMERO_ATA, ID_MEMBRO) VALUES (?, ?, ?, ?);';
        const valuesAdmissao = [
            parseDateOrNull(dataAdmissao), formaAdmissao, parseIntOrNull(ataAdmissao), idMembro
        ];

        console.log('SQL Admissao:', sqlAdmissao);
        console.log('Values Admissao:', valuesAdmissao);

        await connection.query(sqlAdmissao, valuesAdmissao);

        const sqlDemissao = 'INSERT INTO DEMISSAO (DATA_DEMISSAO, FORMA_DEMISSAO, NUMERO_ATA, ID_MEMBRO) VALUES (?, ?, ?, ?);';
        const valuesDemissao = [
            parseDateOrNull(dataDemissao), formaDemissao, parseIntOrNull(ataDemissao), idMembro
        ];

        console.log('SQL Demissao:', sqlDemissao);
        console.log('Values Demissao:', valuesDemissao);

        await connection.query(sqlDemissao, valuesDemissao);

        const sqlRolSeparado = 'INSERT INTO ROL_SEPARADO (DATA_ROL_SEPARADO, ATA_ROL_SEPARADO, CASAMENTO, DISPLINA, DATA_DISCIPLINA, ATA_DISCIPLINA, ID_MEMBRO) VALUES (?, ?, ?, ?, ?, ?, ?);';
        const valuesRolSeparado = [
            parseDateOrNull(dataRolSeparado), parseIntOrNull(ataRolSeparado), parseDateOrNull(dataCasamento),
            disciplina, parseDateOrNull(dataDisciplina), parseIntOrNull(ataDisciplina), idMembro
        ];

        console.log('SQL Rol Separado:', sqlRolSeparado);
        console.log('Values Rol Separado:', valuesRolSeparado);

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
            cidade, estado, localResidencia, localNascimento, estadoNascimento, cep
        } = req.body;

        const sqlMembro = 'UPDATE MEMBRO SET NOME = ?, COMUNGANTE = ?, DATA_NASCIMENTO = ?, NOME_PAI = ?, NOME_MAE = ?, SEXO = ?, ESCOLARIDADE = ?, PROFISSAO = ?, NUMERO_DE_ROL = ?, EMAIL = ?, TELEFONE = ?, CELULAR = ?, ESTADO_CIVIL = ? WHERE ID_MEMBRO = ?;';
        const valuesMembro = [
            nome, parseInt(comungante), dataNascimento, nomePai, nomeMae, sexo, escolaridade,
            profissao, numeroDeRol, email, telefone, celular, estadoCivil, id
        ];

        await connection.query(sqlMembro, valuesMembro);

        const sqlEndereco = 'UPDATE ENDERECO SET CEP = ?, ENDERECO = ?, BAIRRO = ?, COMPLEMENTO = ?, CIDADE = ?, ESTADO = ?, LOCAL_RESIDENCIA = ?, LOCAL_NASCIMENTO = ?, ESTADO_NASCIMENTO = ? WHERE ID_MEMBRO = ?;';
        const valuesEndereco = [
            cep, endereco, bairro, complemento, cidade, estado, localResidencia, localNascimento,
            estadoNascimento, id
        ];

        await connection.query(sqlEndereco, valuesEndereco);

        res.json({ message: 'Membro atualizado com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar membro:', error);
        res.status(500).json({ error: 'Erro ao atualizar membro' });
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

        const sqlMembro = 'DELETE FROM MEMBRO WHERE ID_MEMBRO = ?;';
        await connection.query(sqlMembro, [id]);

        const sqlEndereco = 'DELETE FROM ENDERECO WHERE ID_MEMBRO = ?;';
        await connection.query(sqlEndereco, [id]);

        res.json({ message: 'Membro deletado com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar membro:', error);
        res.status(500).json({ error: 'Erro ao deletar membro' });
    } finally {
        if (connection) connection.release();
    }
};

export { membroController };
