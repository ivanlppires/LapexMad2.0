import db from '../config/db.js'; // Configuração do banco de dados

// Controlador para consulta básica
export const getBasicData = async (req, res) => {
  const { year, species } = req.query;
  try {
    const [rows] = await db.query(
      'SELECT COUNT(volume) AS volume_total FROM gf1 WHERE ano = ? AND specie = ?',
      [year, species]
    );
    res.json(rows[0]);
  } catch (error) {
    console.error('Erro na consulta básica:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
};

// Controlador para consulta intermediária
export const getIntermediateData = async (req, res) => {
  const { year, species, municipio } = req.query;
  try {
    const [rows] = await db.query(
      'SELECT COUNT(volume) AS volume_total FROM gf1 WHERE ano = ? AND specie = ? AND municipio = ?',
      [year, species, municipio]
    );
    res.json(rows[0]);
  } catch (error) {
    console.error('Erro na consulta intermediária:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
};

// Controlador para consulta avançada
export const getAdvancedData = async (req, res) => {
  const { year, species, ccsema } = req.query;
  try {
    const [rows] = await db.query(
      'SELECT COUNT(volume) AS volume_total FROM gf1 WHERE ano = ? AND specie = ? AND ccsema = ?',
      [year, species, ccsema]
    );
    res.json(rows[0]);
  } catch (error) {
    console.error('Erro na consulta avançada:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
};
