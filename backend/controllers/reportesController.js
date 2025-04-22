import { pool } from '../server.js';

// Generar reporte de reservas
export const generarReporteReservas = async (req, res) => {
    try {
        const reportes = await pool.query(
            'SELECT usuarios.nombre, alojamientos.nombre AS alojamiento, reservas.fecha_inicio, reservas.fecha_fin, reservas.estado FROM reservas JOIN usuarios ON reservas.usuario_id = usuarios.id JOIN alojamientos ON reservas.alojamiento_id = alojamientos.id'
        );
        res.json(reportes.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Generar reporte de pagos
export const generarReportePagos = async (req, res) => {
    try {
        const reportes = await pool.query(
            'SELECT usuarios.nombre, pagos.monto, pagos.metodo_pago, pagos.estado, pagos.fecha_pago FROM pagos JOIN reservas ON pagos.reserva_id = reservas.id JOIN usuarios ON reservas.usuario_id = usuarios.id'
        );
        res.json(reportes.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
