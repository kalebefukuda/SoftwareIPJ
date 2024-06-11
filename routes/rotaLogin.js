import express from 'express';
import { connectDatabase } from '../config/database.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const { usuario, senha } = req.body;

    try {
        connectDatabase(async (err, con) => {
            if (err) {
                console.error('Erro ao obter conexão do pool:', err);
                res.status(500).json({ status: 'error', message: 'Erro no servidor' });
                return;
            }

            try {
                const [rows] = await con.promise().query('SELECT * FROM login WHERE usuario = ? AND senha = ?', [usuario, senha]);

                if (rows.length > 0) {
                    res.json({ status: 'success', message: 'Login bem-sucedido' });
                } else {
                    res.json({ status: 'error', message: 'Credenciais inválidas' });
                }
            } catch (error) {
                console.error('Erro ao executar consulta:', error);
                res.status(500).json({ status: 'error', message: 'Erro no servidor' });
            } finally {
                con.release();
            }
        });
    } catch (error) {
        console.error('Erro no servidor:', error);
        res.status(500).json({ status: 'error', message: 'Erro no servidor' });
    }
});

export { router };
