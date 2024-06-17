import express from "express";
import path from "path";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { relatorioGeral } from "../src/controllers/RelatorioController.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let router = express.Router();

// Chamar arquivo
router.get('/relatorios', (req, res) => {
    res.sendFile(path.join(__dirname, '../src', 'views', 'pages', 'Relatorio.html'));
});

router.get('/relatorios/lista-aniversarios', (req, res) => {
    res.sendFile(path.join(__dirname, '../src', 'views', 'pages','listHtml', 'ListaAniversario.html'));
});

router.get('/relatorios/lista-comungantes-fem', (req, res) => {
    res.sendFile(path.join(__dirname, '../src', 'views', 'pages','listHtml', 'ListaComunFem.html'));
});

router.get('/relatorios/lista-comungantes-mas', (req, res) => {
    res.sendFile(path.join(__dirname, '../src', 'views', 'pages','listHtml', 'ListaComunMas.html'));
});

router.get('/relatorios/lista-nao-comungantes-mas', (req, res) => {
    res.sendFile(path.join(__dirname, '../src', 'views', 'pages','listHtml', 'ListaNaoComunMas.html'));
});

router.get('/relatorios/lista-nao-comungantes-fem', (req, res) => {
    res.sendFile(path.join(__dirname, '../src', 'views', 'pages','listHtml', 'ListaNaoComunFem.html'));
});

router.get('/relatorios/lista-comungantes-sede', (req, res) => {
    res.sendFile(path.join(__dirname, '../src', 'views', 'pages','listHtml', 'ListaComunSede.html'));
});

router.get('/relatorios/lista-data-casamento', (req, res) => {
    res.sendFile(path.join(__dirname, '../src', 'views', 'pages','listHtml', 'ListaDataCasamento.html'));
});

router.get('/relatorios/lista-chamada-assembleia', (req, res) => {
    res.sendFile(path.join(__dirname, '../src', 'views', 'pages','listHtml', 'ListaChamadaAssembleia.html'));
});

router.get('/relatorios/lista-chamada-assembleia-adm', (req, res) => {
    res.sendFile(path.join(__dirname, '../src', 'views', 'pages','listHtml', 'ListaChamadaAssembleiaAdm.html'));
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

router.get('/api/lista-nao-comungantes-mas', async (req, res) => {
    try {
        const naoComunMas= await relatorioGeral.getListaNaoComunMas();
        res.json(naoComunMas);
    } catch (e) {
        console.error('Erro ao obter lista de nao comungantes masculino', e);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

router.get('/api/lista-nao-comungantes-fem', async (req, res) => {
    try {
        const naoComunFem= await relatorioGeral.getListaNaoComunFem();
        res.json(naoComunFem);
    } catch (e) {
        console.error('Erro ao obter lista de nao comungantes feminino', e);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

router.get('/api/lista-comungantes-sede', async (req, res) => {
    try {
        const comunSede= await relatorioGeral.getListaComunSede();
        res.json(comunSede);
    } catch (e) {
        console.error('Erro ao obter lista comungantes sede', e);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

router.get('/api/lista-data-casamento', async (req, res) => {
    try {
        const dataCasamento= await relatorioGeral.getListaDataCasamento();
        res.json(dataCasamento);
    } catch (e) {
        console.error('Erro ao obter lista de data de casamento', e);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

router.get('/api/lista-chamada-assembleia', async (req, res) => {
    try {
        const chamadaAssembleia= await relatorioGeral.getListaAssembleia();
        res.json(chamadaAssembleia);
    } catch (e) {
        console.error('Erro ao obter lista de chamada de assembleia', e);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

router.get('/api/lista-chamada-assembleia-adm', async (req, res) => {
    try {
        const chamadaAssembleiaAdm= await relatorioGeral.getListaAssembleiaAdm();
        res.json(chamadaAssembleiaAdm);
    } catch (e) {
        console.error('Erro ao obter lista de chamada de assembleia Administrativa', e);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});
export {router}