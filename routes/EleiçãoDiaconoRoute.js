import express from 'express';
import EleicaoDiaconoController from '../app/controllers/EleiçãoDiaconoController.js';

const router = express.Router();

router.post('/', (req,res) =>{
    EleicaoDiaconoController.inserirEleicaoDiacono(req,res);
});

// Listar todas as eleições de diácono
router.get('/', (req,res) => {
    EleicaoDiaconoController.listarTodasEleicoes(req,res);
});

// Obter uma eleição de diácono específica
router.get('/:id', (req,res) => {
    EleicaoDiaconoController.obterEleicaoDiaconoPorId(req,res);
});


// Atualizar uma eleição de diácono existente
router.put('/:id', (req,res) => {
    EleicaoDiaconoController.atualizarEleicaoDiacono(req,res);
});

// Excluir uma eleição de diácono
router.delete('/:id', (req,res) => {
    EleicaoDiaconoController.excluirEleicaoDiacono(req,res);
});

export { router };
