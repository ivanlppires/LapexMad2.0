import express from 'express';
import { checkPermission } from '../middlewares/authMiddleware.js';
import {
  getBasicData,
  getIntermediateData,
  getAdvancedData,
} from '../controllers/exportacaoMTController.js';

const router = express.Router();

// Rotas com níveis de permissão
// Basic: viewer, intermediate, advanced, admin
router.get('/basic', checkPermission(['viewer', 'intermediate', 'advanced', 'admin']), getBasicData);

// Intermediate: intermediate, advanced, admin
router.get('/intermediate', checkPermission(['intermediate', 'advanced', 'admin']), getIntermediateData);

// Advanced: advanced, admin
router.get('/advanced', checkPermission(['advanced', 'admin']), getAdvancedData);


export default router;
