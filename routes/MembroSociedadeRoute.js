import express from 'express';
import MembroSociedadeController from '../app/controllers/MembroSociedadeController.js';

const router = express.Router();

// Criar um novo membro
router.post('/', (req, res) => {
    MembroSociedadeController.inserirMembroSociedade(req, res);
});

// Listar todos os Membros do Banco
router.get('/', (req,res) => {
    MembroSociedadeController.listarTodosMembrosSociedade(req,res);
})

// Obter um membro específico
router.get('/:id', (req, res) => {
    MembroSociedadeController.obterMembroSociedadePorId(req,res);
});

// Atualizar um membro existente
router.put('/:id', (req, res) => {
    MembroSociedadeController.atualizarMembroSociedade(req, res);
});

// Excluir um membro
router.delete('/:id', (req, res) => {
    MembroSociedadeController.excluirMembroSociedade(req, res);
});



export { router };
