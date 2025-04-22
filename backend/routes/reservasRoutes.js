import express from 'express';
import {
    crearReserva,
    obtenerReservas,
    obtenerReservaPorId,
    actualizarReserva,
    eliminarReserva
} from '../controllers/reservasController.js';

const router = express.Router();

router.post('/', crearReserva);
router.get('/', obtenerReservas);
router.get('/:id', obtenerReservaPorId);
router.put('/:id', actualizarReserva);
router.delete('/:id', eliminarReserva);

export default router;
