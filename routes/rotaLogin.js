import express from 'express';
import connect from '../config/Connection.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const { usuario, senha } = req.body;

    try {
        const con = await connect();
        const [rows] = await con.query('SELECT * FROM login WHERE usuario = ? AND senha = ?', [usuario, senha]);

        if (rows.length > 0) {
            res.json({ status: 'success', message: 'Login bem-sucedido' });
        } else {
            res.json({ status: 'error', message: 'Credenciais inválidas' });
        }
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Erro no servidor' });
    }
});

export { router };
