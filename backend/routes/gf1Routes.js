import express from 'express';
import { checkPermission } from '../middlewares/authMiddleware.js';
import {
  getBasicData,
  getIntermediateData,
  getAdvancedData,
} from '../controllers/gf1Controller.js';
import dotenv from 'dotenv';


const router = express.Router();

// Rotas com níveis de permissão  
// Basic: viewer, intermediate, advanced, admin
router.get('/basic', checkPermission(process.env.VIEWER), getBasicData);

// Intermediate: intermediate, advanced, admin
router.get('/intermediate', checkPermission(process.env.INTERMEDIATE), getIntermediateData);

// Advanced: advanced, admin
router.get('/advanced', checkPermission(process.env.ADVANCED), getAdvancedData);


export default router;
