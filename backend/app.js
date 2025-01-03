import express from 'express';
import dotenv from 'dotenv';
import routes from './routes';
import { requestLogger } from './middlewares/requestLogger.js';
import { verifyFirebaseToken } from './middlewares/authMiddleware.js';

dotenv.config();

const app = express();

// Middlewares globais
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);
app.use('/', verifyFirebaseToken, routes);

export default app;
