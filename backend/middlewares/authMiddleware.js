import admin from 'firebase-admin';

/* Níveis de permissão
 * - viewer: consultas simples
 * - intermediate: consultas com filtros adicionais
 * - advanced: consulta com ccsema
 * - admin: todas as permissões e atribuir permissões a outros usuários
 */ 

// Middleware para verificar permissões
export const checkPermission = (requiredRoles) => {
  return async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(' ')[1]; // Token do cabeçalho
      if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' });
      }

      const decodedToken = await admin.auth().verifyIdToken(token);

      // Checa se o usuário tem ao menos um dos papéis necessários
      const userRoles = decodedToken.roles || [];
      const hasPermission = requiredRoles.some((role) => userRoles.includes(role));

      if (hasPermission) {
        req.user = decodedToken; // Salva as informações do usuário na requisição
        return next();
      }

      return res.status(403).json({ message: 'Acesso negado: Permissão insuficiente' });
    } catch (error) {
      console.error('Erro ao verificar token:', error);
      res.status(401).json({ message: 'Token inválido' });
    }
  };
};