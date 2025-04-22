import express from 'express';
import { generarReporteReservas, generarReportePagos } from '../controllers/reportesController.js';
import { verificarToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/reservas', verificarToken, generarReporteReservas);
router.get('/pagos', verificarToken, generarReportePagos);

export default router;
