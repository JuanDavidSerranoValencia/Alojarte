import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pg from 'pg';
import usuariosRoutes from './routes/usuariosRoutes.js';
import reservasRoutes from './routes/reservasRoutes.js';
import pagosRoutes from './routes/pagosRoutes.js';
import reportesRoutes from './routes/reportesRoutes.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const { Pool } = pg;
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT
});

app.use('/api/usuarios', usuariosRoutes);
app.use('/api/reservas', reservasRoutes);
app.use('/api/pagos', pagosRoutes);
app.use('/api/reportes', reportesRoutes);

app.get('/', (req, res) => {
    res.send('API Alojarte funcionando 🚀');
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

export { pool };