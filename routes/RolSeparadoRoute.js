import express from 'express';
import RolSeparadoController from '../app/controllers/RolSeparadoController.js';

const router = express.Router();

//
router.post('/', (req, res) => {
    RolSeparadoController.inserirRolSeparado(req,res);
});

//
router.get('/', (req,res) => {
    RolSeparadoController.listarTodosRolSeparado(req,res);
})

//
router.get('/:id', (req, res) => {
    RolSeparadoController.obterRolSeparadoPorId(req,res);
});

//
router.put('/:id', (req,res) => {
    RolSeparadoController.atualizarRolSeparado(req,res);
});

//
router.delete('/:id', (req, res) => {
    RolSeparadoController.excluirRolSeparado(req,res);
});



export { router };
