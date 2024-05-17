import express from 'express';
import EleicaoPresbiteroController from '../app/controllers/EleiçãoPresbiteroController.js';

const router = express.Router();

// Criar uma nova eleição de presbítero
router.post('/', (req,res) =>{
    EleicaoPresbiteroController.inserirEleicaoPresbitero(req,res);
});


//TODO

// // Listar todas as eleições de presbítero
// router.get('/', EleicaoPresbiteroController.listar);

// // Obter uma eleição de presbítero específica
// router.get('/:id', EleicaoPresbiteroController.obter);


// // Atualizar uma eleição de presbítero existente
// router.put('/:id', EleicaoPresbiteroController.atualizar);

// // Excluir uma eleição de presbítero
// router.delete('/:id', EleicaoPresbiteroController.excluir);

export { router };
