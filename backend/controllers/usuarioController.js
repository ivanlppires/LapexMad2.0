import admin from 'firebase-admin';

// Controlador para atribuir permissões a usuários
export const assignPermissions = async (req, res) => {
  const { uid, roles } = req.body; // UID do usuário e as permissões a serem atribuídas
  try {
    // Define as Custom Claims no Firebase Auth
    await admin.auth().setCustomUserClaims(uid, { roles });

    res.json({ message: `Permissões atribuídas ao usuário ${uid} com sucesso.` });
  } catch (error) {
    console.error('Erro ao atribuir permissões:', error);
    res.status(500).json({ message: 'Erro ao atribuir permissões.' });
  }
};
