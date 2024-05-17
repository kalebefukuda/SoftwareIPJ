import express from "express";
import path from "path";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let router = express.Router();

router.get('/relatorios', (req, res) => {
    res.sendFile(path.join(__dirname, '../app', 'views', 'pages', 'Relatorio.html'));
});

export {router}