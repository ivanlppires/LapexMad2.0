import { execute } from '../utils/query';
import admin from 'firebase-admin';
import serviceAccount from '../config/serviceAccountKey.json';

// Inicializa o Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Middleware para verificar token do Firebase
export const verifyFirebaseToken = async (req, res, next) => { 
    const token = req.headers.authorization?.split(' ')[1]; // Extrai o token do cabeçalho
    if (!token) 
      return res.status(401).json({ message: 'Token não fornecido' });
    req.user = await admin.auth().verifyIdToken(token);// Salva os dados do usuário na requisição
    const sql = `SELECT u.*, p.nome as perfil, p.id as perfil_id FROM usuario u INNER JOIN perfil p ON (u.perfil=p.id) WHERE u.uid = '${req.user.uid}'`;
    const result = await execute(sql);
    if(!result[0]) 
      return res.status(401).json({ message: 'Usuário não encontrado' });
    req.user = {...req.user, ...result[0]};
    next();
}

// Mantém as exportações existentes
export const checkPermission = (level) => {
  return async (req, res, next) => {
    try {
      const hasPermission = req.user.perfil_id >= level;
      if (hasPermission) 
        return next();
      return res.status(403).json({ message: 'Acesso negado: Permissão insuficiente' });
    } catch (error) {
      console.error('Erro ao verificar token:', error);
      res.status(401).json({ message: 'Token inválido' });
    }
  };
};
