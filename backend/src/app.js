import express from 'express';
import cors from 'cors';
import requestsRoutes from './routes/requests.routes.js';

const app = express();

var corsOptions = {
    origin: process.env.URL_ALLOWED,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

//Middlewares
app.use(cors(corsOptions));
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