import express from 'express';
import { login } from '../app/controllers/LoginController.js';

const router = express.Router();

router.post('/login', login);

export { router };
