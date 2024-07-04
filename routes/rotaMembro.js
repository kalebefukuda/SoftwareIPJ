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

// API Routes
router.get('/api/membros', membroController.list);
router.post('/api/membros', membroController.create);
router.put('/api/membros/:id', membroController.update);
router.delete('/api/membros/:id', membroController.delete);

export { router };