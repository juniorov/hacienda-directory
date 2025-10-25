import express from 'express';
import cors from 'cors';
import requestsRoutes from './routes/requests.routes.js';

const app = express();

//Middlewares
app.use(cors());
app.use(express.json());

app.use('/api/v1', requestsRoutes);

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Manejo de errores 404
// app.use('*', (req, res) => {
//     res.status(404).json({
//         error: 'Ruta no encontrada',
//         path: req.originalUrl
//     });
// });

// Middleware de errores global
app.use((error, req, res, next) => {
    console.error('Error:', error);
    res.status(500).json({
        error: 'Error interno del servidor',
        message: error.message
    });
});

export default app;