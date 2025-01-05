import express from 'express';
import gf1Routes from './gf1Routes.js';
import userRoutes from './usuarioRoutes.js';
import exportacaoBRRoutes from './exportacaoBRRoutes.js';
import exportacaoMTRoutes from './exportacaoMTRoutes.js';
import gf3Routes from './gf3Routes.js';
import gf3iRoutes from './gf3iRoutes.js';
import importacaoRoutes from './importacaoRoutes.js';
import manejoRoutes from './manejoRoutes.js';
import residuosRoutes from './residuosRoutes.js';
import tributacaoRoutes from './tributacaoRoutes.js';
import usuariosRoutes from './usuarioRoutes.js';
import { requestLogger } from '../middlewares/requestLogger.js';

const router = express.Router();

router.use(requestLogger);

router.use('/exportacaoBR', exportacaoBRRoutes);
router.use('/exportacaoMT', exportacaoMTRoutes);
router.use('/gf1', gf1Routes);
router.use('/gf3', gf3Routes);
router.use('/gf3i', gf3iRoutes);
router.use('/importacao', importacaoRoutes);
router.use('/manejo', manejoRoutes);
router.use('/residuos', residuosRoutes);
router.use('/tributacao', tributacaoRoutes);
router.use('/usuarios', usuariosRoutes); 


// Rotas relacionadas aos usuários
router.use('/users', userRoutes);

export default router;
