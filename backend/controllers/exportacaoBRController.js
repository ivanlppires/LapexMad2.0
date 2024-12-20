import db from '../config/db.js'; // Configuração do banco de dados

// Controlador para consulta básica
export const getBasicData = async (req, res) => {
  const { anos, produtos } = req.query;
  try {
    let sql = 'SELECT * FROM exportacao_br WHERE 1';
    if (anos){
      sql += ' AND (';
      anos.forEach((ano, index) => {
        sql += ` ano = ${ano}`;
        if (index < anos.length - 1) sql += ' OR';
      });
      sql += ')';

    }
    if (produtos){
      sql += ' AND (';
      produtos.forEach((produto, index) => {
        sql += ` produto_id = ${produto}`;
        if (index < produtos.length - 1) sql += ' OR';
      });
      sql += ')';
    }
    const [rows] = await db.query(sql);
    res.json(rows[0]);
  } catch (error) {
    console.error('Erro na consulta básica:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
};
