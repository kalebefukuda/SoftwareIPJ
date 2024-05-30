import connect from '../../config/Connection.js'
import path from 'path';
import fs from 'fs';

const con = await connect();
const uploadDir = path.join(process.cwd(), '/app/views/uploads/');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}


let sociedadeInterna = {};

// Listar sociedades
sociedadeInterna.all = async function(req, res) {
    try {
        let [sociedade] = await con.query('SELECT * FROM sociedade_interna;');
        return sociedade;
    } catch (e) {
        console.log('Erro ao mostrar sociedades', e);
    }
};

// Create
sociedadeInterna.create = async function(req, res) {
    try {
        const { nome_sociedade } = req.body; // Extrair o nome da sociedade do corpo da solicitação
        const foto_sociedade = req.files ? req.files.foto_sociedade : null;

        const uniqueFilename = Date.now() + '-' + Math.round(Math.random() * 1000) + '.jpg';

        foto_sociedade.mv(path.join(uploadDir, uniqueFilename), async function(err) {
        if (err) {
        console.error('Erro ao mover o arquivo:', err);
        return res.status(500).send(err);
        }

    // Resto do seu código para salvar no banco de dados...
        });

        if (!nome_sociedade || !foto_sociedade) {
            return res.status(400).json({ error: 'Nome da sociedade e foto são obrigatórios' });
        }

        const uploadPath = path.join(uploadDir, foto_sociedade.name);

        foto_sociedade.mv(uploadPath, async function(err) {
            if (err) {
                console.error('Erro ao mover o arquivo:', err);
                return res.status(500).send(err);
            }

            // Preparar a consulta SQL e os valores
            const sql = "INSERT INTO sociedade_interna (nome_sociedade, foto_sociedade) VALUES (?, ?);";
            const values = [nome_sociedade, `/uploads/${foto_sociedade.name}`];

            // Executar a consulta SQL
            const result = await con.query(sql, values);

            // Responder com sucesso e o caminho da imagem
            res.json({ ok: true, message: 'Sociedade cadastrada com sucesso', filePath: `/uploads/${foto_sociedade.name}` });
        });
    } catch (error) {
        console.log('Erro na inserção', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
}

// Update
sociedadeInterna.update = async function(req, res) {
    try {
        let idSociedade = req.params.id_sociedade_interna;
        let { nome_sociedade } = req.body;
        let foto_sociedade = req.files ? req.files.foto_sociedade : null;

        if (!nome_sociedade) {
            return res.status(400).json({ error: 'Nome da sociedade é obrigatório' });
        }

        let sql, values;
        if (foto_sociedade) {
            const uploadPath = path.join(uploadDir, foto_sociedade.name);

            foto_sociedade.mv(uploadPath, function(err) {
                if (err) {
                    console.error('Erro ao mover o arquivo:', err);
                    return res.status(500).send(err);
                }
            });

            sql = "UPDATE sociedade_interna SET nome_sociedade = ?, foto_sociedade = ? WHERE id_sociedade_interna = ?;";
            values = [nome_sociedade, `/uploads/${foto_sociedade.name}`, idSociedade];
        } else {
            sql = "UPDATE sociedade_interna SET nome_sociedade = ? WHERE id_sociedade_interna = ?;";
            values = [nome_sociedade, idSociedade];
        }

        let result = await con.query(sql, values);

        res.send({
            status: "Update concluido",
            result: result
        });
    } catch (e) {
        console.log('Erro ao fazer update', e);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
}

// Delete
sociedadeInterna.delete = async function(req, res) {
    try {
        let idSociedade = req.params.id_sociedade_interna;
        let sql = "DELETE FROM sociedade_interna WHERE id_sociedade_interna = ?;";
        let result = await con.query(sql, [idSociedade]);

        res.send({
            status: "Delete concluido",
            result: result
        });
    } catch (e) {
        console.log('Erro ao deletar Sociedade', e);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
}

export { sociedadeInterna };
