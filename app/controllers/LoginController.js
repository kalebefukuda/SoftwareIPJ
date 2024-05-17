import Login from '../models/LoginModel.js';

class LoginController {
    static login(req, res) {
        const { username, password } = req.body;
        const login = new Login(username, password);

        Login.verificarCredenciais(login, (err, user) => {
            if (err) {
                return res.status(500).json({ message: 'Erro no servidor', error: err.message });
            }

            if (!user) {
                return res.status(401).json({ message: 'Usuário ou senha incorretos' });
            }

            res.json({ message: 'Login bem-sucedido', user });
        });
    }

    static register(req, res) {
        const { username, password } = req.body;
        const login = new Login(username, password);

        Login.encontrarUsuarioPorNome(username, (err, existingUser) => {
            if (err) {
                return res.status(500).json({ message: 'Erro no servidor', error: err.message });
            }

            if (existingUser) {
                return res.status(400).json({ message: 'Usuário já existe' });
            }

            Login.registrarUsuario(login, (err, result) => {
                if (err) {
                    return res.status(500).json({ message: 'Erro no servidor', error: err.message });
                }

                res.status(201).json({ message: 'Usuário registrado com sucesso', result });
            });
        });
    }

    static logout(req, res) {
        // Implementação de logout se necessário
        res.json({ message: 'Logout bem-sucedido' });
    }
}

export default LoginController;
