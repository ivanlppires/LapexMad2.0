import { select, from, where, group, limit, order, execute } from "../utils/query.js";

// Controlador para consulta básica - anos e produtos
export const getBasicData = async (req, res) => {
  const { anos, produtos } = req.query;
  try {
    let sql = 'SELECT * FROM exportacao_br WHERE 1';
    if (anos) {
      sql += ' AND (';
      anos.forEach((ano, index) => {
        sql += ` ano = ${ano}`;
        if (index < anos.length - 1) sql += ' OR';
      });
      sql += ')';

    }
    if (produtos) {
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

// Controlador para consulta intermediária - anos, produto, especies e municipios
export const getIntermediateData = async (req, res) => {
  const { anos, produtos, especies, municipios } = req.query;
  try {
    let sql = 'SELECT * FROM exportacao_br WHERE 1';
    if (anos) {
      sql += ' AND (';
      anos.forEach((ano, index) => {
        sql += ` ano = ${ano}`;
        if (index < anos.length - 1) sql += ' OR';
      });
      sql += ')';
    }
    if (produtos) {
      sql += ' AND (';
      produtos.forEach((produto, index) => {
        sql += ` produto_id = ${produto}`;
        if (index < produtos.length - 1) sql += ' OR';
      });
      sql += ')';
    }
    if (especies) {
      sql += ' AND (';
      especies.forEach((especie, index) => {
        sql += ` especie_id = ${especie}`;
        if (index < especies.length - 1) sql += ' OR';
      });
      sql += ')';
    }
    if (municipios) {
      sql += ' AND (';
      municipios.forEach((municipio, index) => {
        sql += ` municipio_id = ${municipio}`;
        if (index < municipios.length - 1) sql += ' OR';
      });
      sql += ')';
    }
    const [rows] = await db.query(sql);
    res.json(rows[0]);
  } catch (error) {
    console.error('Erro na consulta intermediária:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
};

// Controlador para consulta avançada -  anos, produto, especies, municipios, ccsemas e lotes
export const getAdvancedData = async (req, res) => {
  const { anos, produtos, especies, municipios, ccsemas, lotes } = req.query;
  try {
    let sql = 'SELECT * FROM exportacao_br WHERE 1';
    if (anos) {
      sql += ' AND (';
      anos.forEach((ano, index) => {
        sql += ` ano = ${ano}`;
        if (index < anos.length - 1) sql += ' OR';
      });
      sql += ')';
    }
    if (produtos) {
      sql += ' AND (';
      produtos.forEach((produto, index) => {
        sql += ` produto_id = ${produto}`;
        if (index < produtos.length - 1) sql += ' OR';
      });
      sql += ')';
    }
    if (especies) {
      sql += ' AND (';
      especies.forEach((especie, index) => {
        sql += ` especie_id = ${especie}`;
        if (index < especies.length - 1) sql += ' OR';
      });
      sql += ')';
    }
    if (municipios) {
      sql += ' AND (';
      municipios.forEach((municipio, index) => {
        sql += ` municipio_id = ${municipio}`;
        if (index < municipios.length - 1) sql += ' OR';
      });
      sql += ')';
    }
    if (ccsemas) {
      sql += ' AND (';
      ccsemas.forEach((ccsema, index) => {
        sql += ` ccsema_id = ${ccsema}`;
        if (index < ccsemas.length - 1) sql += ' OR';
      });
      sql += ')';
    }
    if (lotes) {
      sql += ' AND (';
      lotes.forEach((lote, index) => {
        sql += ` lote_id = ${lote}`;
        if (index < lotes.length - 1) sql += ' OR';
      });
      sql += ')';
    }
    const [rows] = await db.query(sql);
    res.json(rows[0]);
  } catch (error) {
    console.error('Erro na consulta avançada:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
};
