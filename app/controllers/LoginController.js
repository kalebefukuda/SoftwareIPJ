import connect from '../../config/Connection.js'

let loginController = {};

// Função de login
loginController.login = async function(req, res) {
    try {
        const { usuario, senha } = req.body;

        // Conectando ao banco de dados
        const con = await connect();

        // Consultando o banco de dados para verificar as credenciais
        const [rows] = await con.query('SELECT * FROM login WHERE usuario = ? AND senha = ?', [usuario, senha]);

        if (rows.length > 0) {
            // Credenciais válidas
            res.send({ status: 'success', message: 'Login realizado com sucesso!' });
        } else {
            // Credenciais inválidas
            res.send({ status: 'error', message: 'Credenciais inválidas!' });
        }
    } catch (e) {
        console.log('Erro ao tentar fazer login', e);
        res.status(500).send({ status: 'error', message: 'Erro ao tentar fazer login' });
    }
};

export { loginController };
