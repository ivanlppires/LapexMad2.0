import db from '../config/db.js'; // Configuração do banco de dados

// Função auxiliar para criar a cláusula WHERE
const createWhereClause = (params) => {
  const whereClauses = [];
  if (params.year) {
    whereClauses.push('im.ano = ?');
  }
  if (params.productId) {
    whereClauses.push('pr.id = ?');
  }
  if (params.countryId) {
    whereClauses.push('p.id = ?');
  }
  return whereClauses;
};

// Função auxiliar para criar a cláusula SELECT
const createSelectFields = () => {
  return `
    im.ano AS ano,
    pr.nome AS produto_nome,
    p.nome AS pais_nome,
    SUM(im.valor) AS valor_total_m3
  `;
};

// Função auxiliar para criar a subconsulta de valor total em dólar
const createSubQuery = () => {
  return `
    (
      SELECT 
        SUM(im2.valor)
      FROM 
        importacao_mundial im2
      INNER JOIN unidade_medida um2 ON um2.id = im2.unidade_medida_id
      INNER JOIN pais p2 ON p2.id = im2.pais_id
      INNER JOIN produto pr2 ON pr2.id = im2.produto_id
      WHERE 
        im2.ano = im.ano
        AND p2.nome = p.nome
        AND pr2.nome = pr.nome
        AND um2.id = 13
    ) AS valor_total_dolar
  `;
};

// Função auxiliar para criar a cláusula GROUP BY
const createGroupByFields = () => {
  return `
    im.ano, pr.nome, p.nome
  `;
};

// Função para gerar a consulta SQL dinâmica
const generateQuery = (params) => {
  const selectFields = createSelectFields();
  const subQuery = createSubQuery();
  const fromTables = `
    importacao_mundial im
    INNER JOIN produto pr ON im.produto_id = pr.id
    INNER JOIN pais p ON im.pais_id = p.id
    INNER JOIN unidade_medida um ON im.unidade_medida_id = um.id
  `;
  const whereClauses = createWhereClause(params);
  const groupByFields = createGroupByFields();

  // Array para os valores da consulta
  const values = [];
  if (params.year) values.push(params.year);
  if (params.productId) values.push(params.productId);
  if (params.countryId) values.push(params.countryId);

  // Junta tudo para formar a consulta SQL dinâmica
  let query = `
    SELECT ${selectFields}, ${subQuery}
    FROM ${fromTables}
    WHERE im.unidade_medida_id = 1
  `;

  // Adiciona as condições ao WHERE
  if (whereClauses.length > 0) {
    query += ` AND ${whereClauses.join(' AND ')}`;
  }

  // Adiciona o agrupamento
  query += ` GROUP BY ${groupByFields};`;

  return { query, values };
};

// Controlador para consulta dinâmica
export const getBasicData = async (req, res) => {
  try {
    // Parâmetros de consulta fornecidos pelo cliente
    const { year, productId, countryId } = req.query;

    // Gera a consulta SQL e os valores para a execução
    const { query, values } = generateQuery({ year, productId, countryId });

    // Executa a consulta
    const [rows] = await db.query(query, values);

    // Retorna o resultado em JSON
    res.json(rows);
  } catch (error) {
    console.error('Erro na consulta dinâmica:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
};
