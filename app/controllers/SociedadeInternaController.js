import path from 'path';
import fs from 'fs';
import { connectDatabase } from '../../config/database.js';

let sociedadeInterna = {};

const uploadDir = path.join(process.cwd(), '/app/views/uploads/');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Listar sociedades
sociedadeInterna.all = async function(req, res) {
    try {
        connectDatabase(async (err, con) => {
            if (err) {
                console.error('Erro ao obter conexão do pool:', err);
                res.status(500).json({ error: 'Erro interno do servidor' });
                return;
            }

            try {
                let [sociedade] = await con.promise().query('SELECT * FROM sociedade_interna;');
                res.json(sociedade);
            } catch (error) {
                console.error('Erro ao executar consulta:', error);
                res.status(500).json({ error: 'Erro interno do servidor' });
            } finally {
                con.release();
            }
        });
    } catch (error) {
        console.error('Erro no servidor:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

// Create
sociedadeInterna.create = async function(req, res) {
    const { nome_sociedade } = req.body;
    const foto_sociedade = req.files ? req.files.foto_sociedade : null;

    if (!nome_sociedade || !foto_sociedade) {
        return res.status(400).json({ error: 'Nome da sociedade e foto são obrigatórios' });
    }

    const uniqueFilename = Date.now() + '-' + Math.round(Math.random() * 1000) + path.extname(foto_sociedade.name);
    const uploadPath = path.join(uploadDir, uniqueFilename);

    try {
        foto_sociedade.mv(uploadPath, async function(err) {
            if (err) {
                console.error('Erro ao mover o arquivo:', err);
                return res.status(500).send(err);
            }

            connectDatabase(async (err, con) => {
                if (err) {
                    console.error('Erro ao obter conexão do pool:', err);
                    res.status(500).json({ error: 'Erro interno do servidor' });
                    return;
                }

                try {
                    const sql = "INSERT INTO sociedade_interna (nome_sociedade, foto_sociedade) VALUES (?, ?);";
                    const values = [nome_sociedade, `/uploads/${uniqueFilename}`];

                    const result = await con.promise().query(sql, values);

                    res.json({ ok: true, message: 'Sociedade cadastrada com sucesso', filePath: `/uploads/${uniqueFilename}` });
                } catch (error) {
                    console.error('Erro na inserção:', error);
                    res.status(500).json({ error: 'Erro interno do servidor' });
                } finally {
                    con.release();
                }
            });
        });
    } catch (error) {
        console.error('Erro ao mover o arquivo:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

// Update
sociedadeInterna.update = async function(req, res) {
    // código de atualização aqui
};

// Delete
sociedadeInterna.delete = async function(req, res) {
    // código de exclusão aqui
};

export { sociedadeInterna };
