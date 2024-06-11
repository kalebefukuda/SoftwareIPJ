import { connectDatabase } from '../../config/ConnectDatabase.js';

let loginController = {};

// Função de login
loginController.login = async function(req, res) {
    try {
        const { usuario, senha } = req.body;

        // Conectando ao banco de dados
        connectDatabase(async (err, con) => {
            if (err) {
                console.error('Erro ao obter conexão do pool:', err);
                res.status(500).send({ status: 'error', message: 'Erro ao conectar ao banco de dados' });
                return;
            }

            try {
                // Consultando o banco de dados para verificar as credenciais
                const [rows] = await con.promise().query('SELECT * FROM login WHERE usuario = ? AND senha = ?', [usuario, senha]);

                if (rows.length > 0) {
                    // Credenciais válidas
                    res.send({ status: 'success', message: 'Login realizado com sucesso!' });
                } else {
                    // Credenciais inválidas
                    res.send({ status: 'error', message: 'Credenciais inválidas!' });
                }
            } catch (e) {
                console.error('Erro ao tentar fazer login', e);
                res.status(500).send({ status: 'error', message: 'Erro ao tentar fazer login' });
            } finally {
                // Liberar a conexão de volta para o pool
                con.release();
            }
        });
    } catch (e) {
        console.error('Erro ao tentar fazer login', e);
        res.status(500).send({ status: 'error', message: 'Erro ao tentar fazer login' });
    }
};

export { loginController };
