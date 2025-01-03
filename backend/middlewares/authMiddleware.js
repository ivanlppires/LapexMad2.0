import admin from 'firebase-admin';

// Middleware para verificar token do Firebase
export const verifyFirebaseToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Extrai o token do cabeçalho
    if (!token) {
      return res.status(401).json({ message: 'Token não fornecido' });
    }

    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken; // Salva os dados do usuário na requisição
    next();
  } catch (error) {
    console.error('Erro ao verificar token do Firebase:', error);
    res.status(401).json({ message: 'Token inválido' });
  }
};

// Mantém as exportações existentes
export const checkPermission = (requiredRoles) => {
  return async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' });
      }

      const decodedToken = await admin.auth().verifyIdToken(token);

      const userRoles = decodedToken.roles || [];
      const hasPermission = requiredRoles.some((role) => userRoles.includes(role));

      if (hasPermission) {
        req.user = decodedToken;
        return next();
      }

      return res.status(403).json({ message: 'Acesso negado: Permissão insuficiente' });
    } catch (error) {
      console.error('Erro ao verificar token:', error);
      res.status(401).json({ message: 'Token inválido' });
    }
  };
};
