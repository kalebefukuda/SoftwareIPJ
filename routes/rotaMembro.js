import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { membroController } from '../src/controllers/MembroController.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../src/views/pages/Membro.html'));
});

router.get('/editar-membro/:id', (req, res) => {
    res.sendFile(path.join(__dirname, '../src/views/pages/EditarMembro.html'));
});

// API Routes
router.get('/api/membros', membroController.list);
router.post('/membros', membroController.create);
router.put('/api/editar-membro/:id', membroController.update);
router.delete('/api/deletar-membro/:id', membroController.delete);
router.get('/api/membros/:id', membroController.getMembroById);

export { router };
