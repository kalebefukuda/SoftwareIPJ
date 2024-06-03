import express from 'express';
import AdmissãoController from '../app/controllers/AdmissãoController.js';

const router = express.Router();

//
router.post('/', (req, res) => {
    AdmissãoController.inserirAdmissao(req,res);
});

//
router.get('/', (req,res) => {
    AdmissãoController.listarTodasAdmissoes(req,res);
})

//
router.get('/:id', (req, res) => {
    AdmissãoController.obterAdmissaoPorId(req,res);
});

//
router.delete('/:id', (req, res) => {
    AdmissãoController.excluirAdmissao(req,res);
});



export { router };
