import express from 'express';
import EleicaoPresbiteroController from '../app/controllers/EleiçãoPresbiteroController.js';

const router = express.Router();

// Criar uma nova eleição de presbítero
router.post('/', (req,res) =>{
    EleicaoPresbiteroController.inserirEleicaoPresbitero(req,res);
});

// Listar todas as eleições de presbítero
router.get('/', (req,res) => {
    EleicaoPresbiteroController.listarTodasEleicoes(req,res);
});

// Obter uma eleição de presbítero específica
router.get('/:id', (req,res) => {
    EleicaoPresbiteroController.obterEleicaoPresbiteroPorId(req,res);
});


// Atualizar uma eleição de presbítero existente
router.put('/:id', (req,res) => {
    EleicaoPresbiteroController.atualizarEleicaoPresbitero(req,res);
});

// Excluir uma eleição de presbítero
router.delete('/:id', (req,res) => {
    EleicaoPresbiteroController.excluirEleicaoPresbitero(req,res);
});

export { router };
