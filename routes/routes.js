import express from 'express';
import MembroController from '../app/controllers/MembroController.js';

const router = express.Router();

// Padrão restFul
// Dessa forma, quando você envia uma solicitação POST para /membros, o servidor sabe que deve chamar o handler inserirMembro, e quando envia uma solicitação GET para /membros, ele sabe que deve chamar o handler listarTodos.

// Rota para inserir um novo membro
router.post('/membros', (req, res) => {
    MembroController.inserirMembro(req, res);
});

// Rota para listar todos os membros
router.get('/membros', (req, res) => {
    MembroController.listarTodos(res);
});

export default router;
