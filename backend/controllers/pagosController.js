import { pool } from '../server.js';

// Procesar pago
export const procesarPago = async (req, res) => {
    const { reserva_id, monto, metodo_pago } = req.body;
    try {
        const pago = await pool.query(
            'INSERT INTO pagos (reserva_id, monto, metodo_pago, estado) VALUES ($1, $2, $3, $4) RETURNING *',
            [reserva_id, monto, metodo_pago, 'completado']
        );
        await pool.query('UPDATE reservas SET estado = $1 WHERE id = $2', ['confirmada', reserva_id]);
        res.status(201).json({ mensaje: 'Pago procesado', pago: pago.rows[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener pagos de un usuario
export const obtenerPagosUsuario = async (req, res) => {
    const usuario_id = req.usuario.id;
    try {
        const pagos = await pool.query(
            'SELECT pagos.* FROM pagos JOIN reservas ON pagos.reserva_id = reservas.id WHERE reservas.usuario_id = $1',
            [usuario_id]
        );
        res.json(pagos.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
