import db from '../config/db.js'; // Configuração do banco de dados

// Controlador para consulta dinâmica
export const getDynamicExportData = async (req, res) => {
  try {
    // Parâmetros de consulta fornecidos pelo cliente
    const {
      year,
      productId,
      remetenteId,
      municipioRemetenteId,
      municipioDestinatarioId,
      tipo,
    } = req.query;

    // Inicializa as partes dinâmicas da consulta
    let selectFields = `
      YEAR(data_emissao) AS ano,
      ? AS tipo,  -- Tipo vai ser passado dinamicamente
      e_remetente.ccsema AS ccsema_remetente,
      e_remetente.nome AS nome_remetente,
      m_remetente.nome AS municipio_remetente,
      es_remetente.nome AS estado_remetente,
      es_remetente.uf AS uf_remetente,
      es_destinatario.nome AS estado_destinatario,
      es_destinatario.uf AS uf_estado_destinatario,
      pr.nome AS nome_produto,
      SUM(volume) AS volume_total_saida,
      um.nome AS unidade_medida_volume,
      SUM(valor_total) AS soma_valor_total_reais
    `;

    let fromTables = `
      ?? gf
      INNER JOIN empreendimento e_remetente ON e_remetente.id = gf.remetente_id
      INNER JOIN municipio m_remetente ON m_remetente.id = e_remetente.municipio_id
      INNER JOIN estado es_remetente ON es_remetente.id = m_remetente.estado_id
      INNER JOIN empreendimento e_destinatario ON e_destinatario.id = gf.destinatario_id
      INNER JOIN municipio m_destinatario ON m_destinatario.id = e_destinatario.municipio_id
      INNER JOIN estado es_destinatario ON es_destinatario.id = m_destinatario.estado_id
      INNER JOIN unidade_medida um ON um.id = gf.unidade_medida_id
      INNER JOIN produto pr ON pr.id = gf.produto_id
    `;

    let whereClauses = [];
    let groupByFields = `
      YEAR(data_emissao),
      e_remetente.ccsema,
      e_remetente.nome,
      m_remetente.nome,
      es_remetente.nome,
      es_remetente.uf,
      es_destinatario.nome,
      es_destinatario.uf,
      pr.nome,
      um.nome
    `;

    // Array para os valores da consulta dinâmica
    const values = [];

    // Adiciona o tipo de tabela (gf3, gf3i, gf2) dinamicamente
    let tableName = '';
    let tipoQuery = '';

    if (tipo === 'gf3') {
      tableName = 'gf3';
      tipoQuery = 'GF3';
    } else if (tipo === 'gf3i') {
      tableName = 'gf3i';
      tipoQuery = 'GF3i';
    } else if (tipo === 'gf2') {
      tableName = 'gf2';
      tipoQuery = 'GF2';
    } else {
      return res.status(400).json({ message: 'Tipo de tabela inválido' });
    }

    // Adiciona o tipo à lista de valores
    values.push(tipoQuery);

    // Adiciona as condições ao WHERE
    if (productId) {
      whereClauses.push('pr.id = ?');
      values.push(productId);
    }
    if (year) {
      whereClauses.push('YEAR(data_emissao) = ?');
      values.push(year);
    }
    if (remetenteId) {
      whereClauses.push('e_remetente.ccsema = ?');
      values.push(remetenteId);
    }
    if (municipioRemetenteId) {
      whereClauses.push('m_remetente.id = ?');
      values.push(municipioRemetenteId);
    }
    if (municipioDestinatarioId) {
      whereClauses.push('m_destinatario.id = ?');
      values.push(municipioDestinatarioId);
    }

    // Junta tudo para formar a consulta SQL dinâmica
    let query = `
      SELECT ${selectFields}
      FROM ${fromTables}
      WHERE 1=1
    `;

    // Adiciona as condições ao WHERE
    if (whereClauses.length > 0) {
      query += ` AND ${whereClauses.join(' AND ')}`;
    }

    // Adiciona o agrupamento
    query += ` GROUP BY ${groupByFields}`;

    // Inicia a parte de UNION ALL com a consulta adicional
    query += ` UNION ALL
      SELECT ${selectFields}
      FROM ${fromTables}
      WHERE 1=1
    `;

    // Adiciona as mesmas condições ao WHERE
    if (whereClauses.length > 0) {
      query += ` AND ${whereClauses.join(' AND ')}`;
    }

    // Adiciona o agrupamento novamente
    query += ` GROUP BY ${groupByFields}`;

    // Ordena pela soma do volume e limita os resultados
    query += ` ORDER BY volume_total_saida DESC LIMIT 20 OFFSET 0`;

    // Executa a consulta
    const [rows] = await db.query(query, values);

    // Retorna o resultado em JSON
    res.json(rows);
  } catch (error) {
    console.error('Erro na consulta dinâmica:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
};
