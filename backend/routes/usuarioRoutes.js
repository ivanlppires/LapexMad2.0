import express from 'express';
import { assignPermissions } from '../controllers/usuarioController.js';
import { checkPermission } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Apenas administradores podem atribuir permissões
router.post('/permissions', checkPermission([process.env.ADMIN]), assignPermissions);

export default router;
