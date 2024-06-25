import express from 'express';
import SociedadeInternaController from '../app/controllers/SociedadeInternaController.js';

const router = express.Router();


// // Criar uma nova sociedade interna
router.post('/', (req,res) => {
    SociedadeInternaController.inserirSociedadeInterna(req,res);
});

// // Listar todas as sociedades internas
router.get('/', (req,res) => {
    SociedadeInternaController.listarTodasSociedadesInternas(req,res);
});

// // Obter uma sociedade interna específica
router.get('/:id', (req,res) => {
    SociedadeInternaController.obterSociedadeInternaPorId(req,res);
});

// // Atualizar uma sociedade interna existente
router.put('/:id', (req,res) => {
    SociedadeInternaController.atualizarSociedadeInterna(req,res);
});

// // Excluir uma sociedade interna
router.delete('/:id', (req,res) => {
    SociedadeInternaController.excluirSociedadeInterna(req,res);
});

export { router };
