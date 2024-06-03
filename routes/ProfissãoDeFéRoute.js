import express from 'express';
import ProfissaodeFeController from '../app/controllers/ProfissãodeFéController.js';

const router = express.Router();

//
router.post('/', (req, res) => {
    ProfissaodeFeController.inserirProfissaoDeFe(req,res);
});

//
router.get('/', (req,res) => {
    ProfissaodeFeController.listarTodasProfissoesDeFe(req,res);
})

//
router.get('/:id', (req, res) => {
    ProfissaodeFeController.obterProfissaoDeFePorId(req,res);
});

//
router.put('/:id', (req,res) => {
    ProfissaodeFeController.atualizarProfissaoDeFe(req,res);
});

//
router.delete('/:id', (req, res) => {
    ProfissaodeFeController.excluirProfissaoDeFe(req,res);
});



export { router };
