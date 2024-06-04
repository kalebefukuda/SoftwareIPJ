import express from 'express';
import EnderecoController from '../app/controllers/EndereçoController.js';

const router = express.Router();

router.post('/', (req,res) => {
    EnderecoController.inserirEndereco(req,res);
});

// Listar todos os endereços
router.get('/', (req,res) => {
    EnderecoController.listarTodosEnderecos(req,res);
});

// Obter um endereço específico
router.get('/:id', (req,res) => {
    EnderecoController.obterEnderecoPorId(req,res);  //Esse metodo tem assinatura diferente, ele recebe na URL se a consulta sera feita Por id Membro ou id Endereço
});

// Atualizar um endereço existente
router.put('/:id', (req,res) => {
    EnderecoController.atualizarEndereco(req,res);
});

// Excluir um endereço
router.delete('/:id', (req,res) => {
    EnderecoController.excluirEndereco(req,res);
});

export { router };
