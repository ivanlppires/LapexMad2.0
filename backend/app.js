import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes';
import { verifyFirebaseToken } from './middlewares/authMiddleware.js';

dotenv.config();

const app = express();

// Configurar CORS
const corsOptions = {
    origin: 'http://localhost:3000', // Permitir o front-end
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Permitir cookies, se necessário
};
app.use(cors(corsOptions));

// Middlewares globais
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', verifyFirebaseToken, routes);

export default app;
