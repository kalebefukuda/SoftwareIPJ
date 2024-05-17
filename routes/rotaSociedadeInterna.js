import express from "express";
import path from "path";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { sociedadeInterna } from "../app/controllers/SociedadeInternaController.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let router = express.Router();

router.get('/sociedade-interna', async (req, res) => {
    try {
        const sociedades = await sociedadeInterna.all();
        res.sendFile(path.join(__dirname, '../app', 'views', 'pages', 'Sociedade.html'));
    } catch (error) {
        console.error('Erro ao carregar a página da sociedade:', error);
        res.status(500).send('Erro interno do servidor');
    }
});

router.get('/sociedade-interna/inserir', (req, res) => {
    res.sendFile(path.join(__dirname, '../app', 'views', 'pages', 'CadastroSociedade.html'));
});

router.post('/sociedade-interna/inserir', async (req, res) => {
    try {
        const result = await sociedadeInterna.create(req, res);
        console.log('Sociedade inserida');
        res.status(201).json({ ok:true, message: 'Sociedade inserida com sucesso', data: result });
    } catch (error) {
        
        console.error('Erro ao inserir sociedade:', error);
        res.status(500).json({ ok: false, error: 'Erro interno do servidor' });
    }
});

router.put('/sociedade-interna/:id_sociedade_interna', sociedadeInterna.update);

router.delete('/sociedade-interna/:id_sociedade_interna', sociedadeInterna.delete);

export { router };
