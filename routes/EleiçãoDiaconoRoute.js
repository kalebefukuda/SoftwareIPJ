import express from 'express';
import EleicaoDiaconoController from '../app/controllers/EleicaoDiaconoController.js';

const router = express.Router();

router.post('/', (req,res) =>{
    EleicaoDiaconoController.inserirEleicaoDiacono(req,res);
});


//TODO

// // Listar todas as eleições de diácono
// router.get('/', EleicaoDiaconoController.listar);

// // Obter uma eleição de diácono específica
// router.get('/:id', EleicaoDiaconoController.obter);

// // Criar uma nova eleição de diácono

// // Atualizar uma eleição de diácono existente
// router.put('/:id', EleicaoDiaconoController.atualizar);

// // Excluir uma eleição de diácono
// router.delete('/:id', EleicaoDiaconoController.excluir);

export { router };
