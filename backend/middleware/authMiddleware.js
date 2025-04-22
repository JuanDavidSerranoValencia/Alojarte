import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const verificarToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(403).json({ error: 'Acceso denegado, token no proporcionado' });

    try {
        const verificado = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
        req.usuario = verificado;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Token inválido' });
    }
};