import express from 'express';
import { procesarPago, obtenerPagosUsuario } from '../controllers/pagosController.js';
import { verificarToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', verificarToken, procesarPago);
router.get('/', verificarToken, obtenerPagosUsuario);

export default router;
