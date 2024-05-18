import express from "express";
import path from "path";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { relatorioGeral } from "../app/controllers/RelatorioController.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let router = express.Router();

// Chamar arquivo
router.get('/relatorios', (req, res) => {
    res.sendFile(path.join(__dirname, '../app', 'views', 'pages', 'Relatorio.html'));
});

router.get('/relatorios/lista-aniversarios', (req, res) => {
    res.sendFile(path.join(__dirname, '../app', 'views', 'pages','listHtml', 'ListaAniversario.html'));
});

router.get('/relatorios/lista-comungantes-fem', (req, res) => {
    res.sendFile(path.join(__dirname, '../app', 'views', 'pages','listHtml', 'ListaComunFem.html'));
});

router.get('/relatorios/lista-comungantes-mas', (req, res) => {
    res.sendFile(path.join(__dirname, '../app', 'views', 'pages','listHtml', 'ListaComunMas.html'));
});



router.get('/api/lista-aniversarios', async (req, res) => {
    try {
        const aniversariantes = await relatorioGeral.getAniverario();
        res.json(aniversariantes);
    } catch (e) {
        console.error('Erro ao obter lista de aniversariantes:', e);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});


router.get('/api/lista-comungantes-fem', async (req, res) => {
    try {
        const comunFem = await relatorioGeral.getListaComunFem();
        console.log(comunFem);
        res.json(comunFem);
    } catch (e) {
        console.error('Erro ao obter lista de comungantes feminino', e);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

router.get('/api/lista-comungantes-mas', async (req, res) => {
    try {
        const comunMas= await relatorioGeral.getListaComunMas();
        res.json(comunMas);
    } catch (e) {
        console.error('Erro ao obter lista de comungantes masculino', e);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

export {router}