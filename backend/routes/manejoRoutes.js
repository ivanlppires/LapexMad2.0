import express from 'express';
import { checkPermission } from '../middlewares/authMiddleware.js';
import {
  getBasicData,
  getIntermediateData,
  getAdvancedData,
} from '../controllers/manejoController.js';

const router = express.Router();

// Rotas com níveis de permissão
// Basic: viewer, intermediate, advanced, admin
router.get('/basic', checkPermission(['viewer', process.env.INTERMEDIATE, process.env.ADVANCED, process.env.ADMIN]), getBasicData);

// Intermediate: intermediate, advanced, admin
router.get('/intermediate', checkPermission([process.env.INTERMEDIATE, process.env.ADVANCED, process.env.ADMIN]), getIntermediateData);

// Advanced: advanced, admin
router.get('/advanced', checkPermission([process.env.ADVANCED, process.env.ADMIN]), getAdvancedData);


export default router;
