import express from 'express';
import EnderecoController from '../app/controllers/EndereçoController.js';

const router = express.Router();

router.post('/', (req,res) =>{
    EnderecoController.inserirEndereço(req,res);
});


//TODO

// // Listar todos os endereços
// router.get('/', EnderecoController.listar);

// // Obter um endereço específico
// router.get('/:id', EnderecoController.obter);

// // Criar um novo endereço

// // Atualizar um endereço existente
// router.put('/:id', EnderecoController.atualizar);

// // Excluir um endereço
// router.delete('/:id', EnderecoController.excluir);

export { router };
