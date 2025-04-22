import { pool } from '../server.js';

// Crear una nueva reserva
export const crearReserva = async (req, res) => {
    const { usuario_id, fecha_inicio, fecha_fin } = req.body;
    try {
        const nuevaReserva = await pool.query(
            'INSERT INTO reservas (usuario_id, fecha_inicio, fecha_fin) VALUES ($1, $2, $3) RETURNING *',
            [usuario_id, fecha_inicio, fecha_fin]
        );
        res.status(201).json({ mensaje: 'Reserva creada', reserva: nuevaReserva.rows[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener todas las reservas
export const obtenerReservas = async (req, res) => {
    try {
        const resultado = await pool.query('SELECT * FROM reservas');
        res.json(resultado.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener una reserva por ID
export const obtenerReservaPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const resultado = await pool.query('SELECT * FROM reservas WHERE id = $1', [id]);
        if (resultado.rows.length === 0) {
            return res.status(404).json({ mensaje: 'Reserva no encontrada' });
        }
        res.json(resultado.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar una reserva
export const actualizarReserva = async (req, res) => {
    const { id } = req.params;
    const { fecha_inicio, fecha_fin, estado } = req.body;
    try {
        const resultado = await pool.query(
            'UPDATE reservas SET fecha_inicio = $1, fecha_fin = $2, estado = $3 WHERE id = $4 RETURNING *',
            [fecha_inicio, fecha_fin, estado, id]
        );
        res.json({ mensaje: 'Reserva actualizada', reserva: resultado.rows[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar una reserva
export const eliminarReserva = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM reservas WHERE id = $1', [id]);
        res.json({ mensaje: 'Reserva eliminada' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
