import express from "express";
import path from "path";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { sociedadeInterna } from "../src/controllers/SociedadeInternaController.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let router = express.Router();

router.get('/sociedade-interna', (req, res) => {
    res.sendFile(path.join(__dirname, '../src', 'views', 'pages', 'Sociedade.html'));
});

router.get('/sociedade-cadastrada/:id', (req, res) => {
    res.sendFile(path.join(__dirname, '../src', 'views', 'pages', 'SociedadeCadastrada.html'));
});

router.get('/sociedade-interna/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname, '../src', 'views', 'pages', 'CadastroSociedade.html'));
});

router.get('/api/sociedade-interna', async (req, res) => {
    try {
        const sociedades = await sociedadeInterna.all();
        res.json(sociedades);
    } catch (error) {
        console.error('Erro ao buscar sociedades:', error);
        res.status(500).json({ ok: false, error: 'Erro interno do servidor' });
    }
});

router.get('/api/sociedade-cadastrada/:idSociedade', async (req, res) => {
    try {
        // Passe os parâmetros corretamente para a função
        await sociedadeInterna.loadSociedade(req, res);
    } catch (error) {
        console.error('Erro ao carregar sociedade:', error);
        res.status(500).json({ ok: false, error: 'Erro interno do servidor' });
    }
});

router.post('/api/cadastro-sociedade', async (req, res) => {
    try {
        await sociedadeInterna.create(req, res);
    } catch (error) {
        console.error('Erro ao inserir sociedade:', error);
        res.status(500).json({ ok: false, error: 'Erro interno do servidor' });
    }
});

router.put('/sociedade-interna/:id_sociedade_interna', async (req, res) => {
    try {
        await sociedadeInterna.update(req, res);
    } catch (error) {
        console.error('Erro ao atualizar sociedade:', error);
        res.status(500).json({ ok: false, error: 'Erro interno do servidor' });
    }
});

router.delete('/sociedade-interna/:id_sociedade_interna', async (req, res) => {
    try {
        await sociedadeInterna.delete(req, res);
    } catch (error) {
        console.error('Erro ao deletar sociedade:', error);
        res.status(500).json({ ok: false, error: 'Erro interno do servidor' });
    }
});

export { router };
