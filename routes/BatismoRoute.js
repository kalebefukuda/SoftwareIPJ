import express from 'express';
import BatismoController from '../app/controllers/BatismoController.js';

const router = express.Router();

// Criar um novo batismo
router.post('/', (req,res) =>{
    BatismoController.inserirBatismo(req,res);
});

//TODO

// // Listar todos os batismos
// router.get('/', BatismoController.listar);

// // Obter um batismo específico
// router.get('/:id', BatismoController.obter);


// // Atualizar um batismo existente
// router.put('/:id', BatismoController.atualizar);

// // Excluir um batismo
// router.delete('/:id', BatismoController.excluir);

export { router };
