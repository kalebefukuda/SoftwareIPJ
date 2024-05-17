import express from "express";
import path from "path";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { relatorioGeral } from "../app/controllers/RelatorioController.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let router = express.Router();

router.get('/relatorios', (req, res) => {
    res.sendFile(path.join(__dirname, '../app', 'views', 'pages', 'Relatorio.html'));
});

router.get('/relatorios/lista-aniversarios', async (req, res) => {
    try {
        const aniversariantes = await relatorioGeral.getAniverario();
        res.json(aniversariantes);
    } catch (error) {
        console.error('Erro ao obter lista de aniversariantes:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});



export {router}