import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool } from '../server.js';

export const registrarUsuario = async (req, res) => {
    const { nombre, correo, contrasena, rol } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(contrasena, salt);

        const nuevoUsuario = await pool.query(
            'INSERT INTO usuarios (nombre, correo, contrasena, rol) VALUES ($1, $2, $3, $4) RETURNING *',
            [nombre, correo, hashedPassword, rol]
        );
        res.status(201).json({ mensaje: 'Usuario registrado', usuario: nuevoUsuario.rows[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const loginUsuario = async (req, res) => {
    const { correo, contrasena } = req.body;
    try {
        const usuario = await pool.query('SELECT * FROM usuarios WHERE correo = $1', [correo]);
        if (usuario.rows.length === 0) return res.status(401).json({ error: 'Usuario no encontrado' });

        const validPassword = await bcrypt.compare(contrasena, usuario.rows[0].contrasena);
        if (!validPassword) return res.status(401).json({ error: 'Contraseña incorrecta' });

        const token = jwt.sign(
            { id: usuario.rows[0].id, rol: usuario.rows[0].rol },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.json({ mensaje: 'Inicio de sesión exitoso', token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};