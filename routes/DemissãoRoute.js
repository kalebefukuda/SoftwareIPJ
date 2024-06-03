import express from 'express';
import DemissãoController from '../app/controllers/DemissãoController.js';

const router = express.Router();

//
router.post('/', (req, res) => {
    DemissãoController.inserirDemissao(req,res);
});

//
router.get('/', (req,res) => {
    DemissãoController.listarTodasDemissoes(req,res);
})

//
router.get('/:id', (req, res) => {
    DemissãoController.obterDemissaoPorId(req,res);
});

//
router.delete('/:id', (req, res) => {
    DemissãoController.excluirDemissao(req,res);
});



export { router };
