import express from 'express';
import LoginController from '../app/controllers/LoginController.js';

const router = express.Router();

// Rota de login
router.post('/', LoginController.login);

// Rota de registro
router.post('/register', LoginController.register);

// Rota de logout
router.post('/logout', LoginController.logout);

export { router };
