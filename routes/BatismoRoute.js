import express from 'express';
import BatismoController from '../app/controllers/BatismoController.js';

const router = express.Router();

// Criar um novo batismo
router.post('/', (req,res) =>{
    BatismoController.adicionarBatismo(req,res);
});
// Listar todos os batismos
router.get('/', (req,res) => {
    BatismoController.listarTodosBatismos(req,res);
});

// Obter um batismo específico
router.get('/:id', (req,res) => {
    BatismoController.obterBatismoPorId(req,res);
});

// Atualizar um batismo existente
router.put('/:id', (req,res) => {
    BatismoController.atualizarBatismo(req,res);
});

// Excluir um batismo
router.delete('/:id', (req,res) => {
    BatismoController.excluirBatismo(req,res);
});

export { router };
