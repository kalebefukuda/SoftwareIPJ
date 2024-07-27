// SociedadeInternaController.js
import connect from '../../config/Connection.js';
import path from 'path';
import fs from 'fs';

const con = await connect();
const uploadDir = path.join(process.cwd(), '/src/views/uploads/');

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
        const { nome_sociedade } = req.body;
        const foto_sociedade = req.files ? req.files.foto_sociedade : null;

        if (!nome_sociedade || !foto_sociedade) {
            return res.status(400).json({ error: 'Nome da sociedade e foto são obrigatórios' });
        }

        const uniqueFilename = Date.now() + '-' + Math.round(Math.random() * 1000) + path.extname(foto_sociedade.name);
        const uploadPath = path.join(uploadDir, uniqueFilename);

        foto_sociedade.mv(uploadPath, async function(err) {
            if (err) {
                console.error('Erro ao mover o arquivo:', err);
                return res.status(500).send(err);
            }

            try {
                const sql = "INSERT INTO sociedade_interna (nome_sociedade, foto_sociedade) VALUES (?, ?);";
                const values = [nome_sociedade, `/uploads/${uniqueFilename}`];

                const result = await con.query(sql, values);

                res.json({ ok: true, message: 'Sociedade cadastrada com sucesso', filePath: `/uploads/${uniqueFilename}` });
            } catch (error) {
                console.log('Erro na inserção', error);
                res.status(500).json({ error: 'Erro interno do servidor' });
            }
        });
    } catch (error) {
        console.log('Erro na inserção', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

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
sociedadeInterna.delete = async function(id) {
    try {
        const [rows] = await con.query("SELECT FOTO_SOCIEDADE FROM sociedade_interna WHERE id_sociedade_interna = ?", [id]);
        if (rows.length === 0) {
            console.error('Sociedade não encontrada');
            return false;
        }

        const sociedade = rows[0];
        const fotoCaminho = sociedade.FOTO_SOCIEDADE;

        // Remover todas as referências na tabela membro_sociedade
        await con.query("DELETE FROM membro_sociedade WHERE ID_SOCIEDADE_INTERNA = ?", [id]);

        // Agora, deletar a sociedade
        await con.query("DELETE FROM sociedade_interna WHERE id_sociedade_interna = ?", [id]);

        if (fotoCaminho) {
            const filePath = path.join(uploadDir, fotoCaminho);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        return true;
    } catch (e) {
        console.log('Erro ao deletar Sociedade', e);
        return false;
    }
};

sociedadeInterna.loadSociedade = async function(req, res) {
    try {
        let idSociedade = req.params.idSociedade;

        let sql = `
            SELECT s.*, m.nome AS nome_membro, TIMESTAMPDIFF(YEAR, m.DATA_NASCIMENTO, CURDATE()) AS idade
            FROM sociedade_interna s
            LEFT JOIN membro_sociedade ms ON s.id_sociedade_interna = ms.id_sociedade_interna
            LEFT JOIN membro m ON ms.id_membro = m.id_membro
            WHERE s.id_sociedade_interna = ?;
        `;

        let [result] = await con.query(sql, [idSociedade]);

        if (result.length === 0) {
            return res.status(404).json({ ok: false, error: 'Sociedade não encontrada' });
        }

        const sociedadeInterna = result;
        return res.json({ ok: true, sociedade: sociedadeInterna });
        
    } catch (error) {
        console.error('Erro ao carregar sociedade:', error);
        return res.status(500).json({ ok: false, error: 'Erro interno do servidor' });
    }
};

// Buscar membros por nome
sociedadeInterna.search = async function(req, res) {
    const query = req.query.query || '';

    try {
        const sqlQuery = `
            SELECT M.ID_MEMBRO, M.NOME, M.NUMERO_DE_ROL, TIMESTAMPDIFF(YEAR, M.DATA_NASCIMENTO, CURDATE()) AS IDADE, M.FOTO_MEMBRO
            FROM MEMBRO M
            WHERE M.NOME LIKE ?`;

        const [rows] = await con.query(sqlQuery, [`%${query}%`]);
        const basePath = '/uploads/';
        const membros = rows.map(membro => {
            if (!membro.FOTO_MEMBRO) {
                membro.FOTO_MEMBRO = 'assets/Ellipse.png'; // Define a imagem padrão
            } else {
                membro.FOTO_MEMBRO = basePath + membro.FOTO_MEMBRO;
            }
            return {
                ID_MEMBRO: membro.ID_MEMBRO,
                NOME: membro.NOME,
                NUMERO_DE_ROL: membro.NUMERO_DE_ROL,
                IDADE: membro.IDADE,
                FOTO_MEMBRO: membro.FOTO_MEMBRO
            };
        });

        res.json({ ok: true, data: membros });
    } catch (error) {
        console.error('Erro na busca:', error);
        res.status(500).json({ ok: false, error: 'Erro interno do servidor' });
    }
};



// Adicionar membro à sociedade
sociedadeInterna.addMembro = async function(req, res) {
    try {
        const { idSociedade } = req.params;
        const { idMembro } = req.body;

        const sqlQuery = "INSERT INTO membro_sociedade (ID_SOCIEDADE_INTERNA, ID_MEMBRO) VALUES (?, ?)";
        await con.query(sqlQuery, [idSociedade, idMembro]);

        res.json({ ok: true, message: 'Membro adicionado com sucesso' });
    } catch (error) {
        console.error('Erro ao adicionar membro:', error);
        res.status(500).json({ ok: false, error: 'Erro interno do servidor' });
    }
};

export { sociedadeInterna };
