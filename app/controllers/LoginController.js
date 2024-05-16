import connect from '../../config/Connection.js';

const login = async (req, res) => {
    // Extrair o login e senha do corpo da requisição
    const { login, password } = req.body;

    try {
        // Conectar ao banco de dados
        const con = await connect();

        // Consultar o banco de dados para verificar as credenciais do usuário
        const [rows] = await con.query('SELECT * FROM login WHERE usuario = ? AND senha = ?', [login, password]);

        // Verificar se o usuário foi encontrado
        if (rows.length > 0) {
            // Se o usuário for encontrado, retornar um status 200 (OK) e uma mensagem de sucesso
            res.status(200).json({ message: 'Login bem-sucedido' });
        } else {
            // Se as credenciais estiverem incorretas, retornar um status 401 (Unauthorized) e uma mensagem de erro
            res.status(401).json({ error: 'Credenciais inválidas' });
        }
    } catch (error) {
        // Se ocorrer um erro durante a consulta ao banco de dados, retornar um status 500 (Internal Server Error) e uma mensagem de erro
        console.error('Erro durante o login:', error);
        res.status(500).json({ error: 'Erro durante o login' });
    }
};

export { login };
