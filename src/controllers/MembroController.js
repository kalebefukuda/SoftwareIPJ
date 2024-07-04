import connect from '../../config/Connection.js';

const membroController = {};

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
        connection = await connect();
        const { nome, comungante, dataNascimento, nomePai, nomeMae, sexo, escolaridade, profissao, numeroDeRol, email, telefone, celular, estadoCivil, endereco, bairro, complemento, cidade, estado, localResidencia, localNascimento, estadoNascimento, cep } = req.body;

        const sqlMembro = 'INSERT INTO MEMBRO (NOME, COMUNGANTE, DATA_NASCIMENTO, NOME_PAI, NOME_MAE, SEXO, ESCOLARIDADE, PROFISSAO, NUMERO_DE_ROL, EMAIL, TELEFONE, CELULAR, ESTADO_CIVIL) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';
        const valuesMembro = [nome, comungante, dataNascimento, nomePai, nomeMae, sexo, escolaridade, profissao, numeroDeRol, email, telefone, celular, estadoCivil];

        const [resultMembro] = await connection.query(sqlMembro, valuesMembro);
        const idMembro = resultMembro.insertId;

        const sqlEndereco = 'INSERT INTO ENDERECO (ID_MEMBRO, CEP, ENDERECO, BAIRRO, COMPLEMENTO, CIDADE, ESTADO, LOCAL_RESIDENCIA, LOCAL_NASCIMENTO, ESTADO_NASCIMENTO) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';
        const valuesEndereco = [idMembro, cep, endereco, bairro, complemento, cidade, estado, localResidencia, localNascimento, estadoNascimento];

        await connection.query(sqlEndereco, valuesEndereco);

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
        const { nome, comungante, dataNascimento, nomePai, nomeMae, sexo, escolaridade, profissao, numeroDeRol, email, telefone, celular, estadoCivil, endereco, bairro, complemento, cidade, estado, localResidencia, localNascimento, estadoNascimento, cep } = req.body;

        const sqlMembro = 'UPDATE MEMBRO SET NOME = ?, COMUNGANTE = ?, DATA_NASCIMENTO = ?, NOME_PAI = ?, NOME_MAE = ?, SEXO = ?, ESCOLARIDADE = ?, PROFISSAO = ?, NUMERO_DE_ROL = ?, EMAIL = ?, TELEFONE = ?, CELULAR = ?, ESTADO_CIVIL = ? WHERE ID_MEMBRO = ?;';
        const valuesMembro = [nome, comungante, dataNascimento, nomePai, nomeMae, sexo, escolaridade, profissao, numeroDeRol, email, telefone, celular, estadoCivil, id];

        await connection.query(sqlMembro, valuesMembro);

        const sqlEndereco = 'UPDATE ENDERECO SET CEP = ?, ENDERECO = ?, BAIRRO = ?, COMPLEMENTO = ?, CIDADE = ?, ESTADO = ?, LOCAL_RESIDENCIA = ?, LOCAL_NASCIMENTO = ?, ESTADO_NASCIMENTO = ? WHERE ID_MEMBRO = ?;';
        const valuesEndereco = [cep, endereco, bairro, complemento, cidade, estado, localResidencia, localNascimento, estadoNascimento, id];

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
