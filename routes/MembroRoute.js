import express from 'express';
import MembroController from '../app/controllers/MembroController.js';

const router = express.Router();

// Criar um novo membro
router.post('/', (req, res) => {
    MembroController.inserirMembro(req, res);
});

// Listar todos os Membros do Banco
router.get('/', (req,res) => {
    MembroController.listarTodosMembros(req,res);
})

// Obter um membro específico
router.get('/:id', (req, res) => {
    MembroController.obterMembroPorId(req,res);
});

// Atualizar um membro existente
router.put('/:id', (req, res) => {
    MembroController.atualizarMembro(req, res);
});

// Excluir um membro
router.delete('/:id', (req, res) => {
    MembroController.excluirMembro(req, res);
});



export { router };
