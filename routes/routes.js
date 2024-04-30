const express = require('express');
const router = express.Router();
const Membro = require('../app/controllers/MembroController');

// Rota para inserir um novo membro
router.post('/membros', Membro.MembroController.inserirMembro);

// Rota para listar todos os membros
router.get('/membros', Membro.MembroController.listarTodos);

module.exports = router;
