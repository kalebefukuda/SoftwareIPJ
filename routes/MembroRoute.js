import express from 'express';
import MembroController from '../app/controllers/MembroController.js';

const router = express.Router();

// Criar um novo membro
router.get('/', (req, res) => {
    MembroController.inserirMembro(req, res);
});
// Obter um membro específico
router.get('/:id', (req, res) => {
    MembroController.listarTodos(res); //TODO buscar por id
});



//TODO 

// // Atualizar um membro existente
// router.put('/:id',); 

// // Excluir um membro
// router.delete('/:id',);

export { router };
