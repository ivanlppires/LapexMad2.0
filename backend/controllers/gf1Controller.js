import db from "../config/db.js";

// Controlador para consulta básica - totais por ano e especies
export const getBasicData = async (req, res) => {
  const { anos, especies } = req.query;
  try {
    let sql = `SELECT `;
    if (anos) sql += `year(data_emissao) as ano, `;
    if (especies) sql += `especie_popular_cientifico_id, `;
    sql += ` sum(volume) as volumetotal, sum(valor_total) as valortotal FROM gf1 WHERE 1`;

    if (anos) {
      sql += ` AND (`;
      anos.forEach((ano, index) => {
        sql += ` year(data_emissao) = ${ano}`;
        if (index < anos.length - 1) sql += ` OR`;
      });
      sql += `)`;
    }

    if (especies) {
      sql += ` AND (`;
      especies.forEach((especie, index) => {
        sql += ` especie_popular_cientifico_id = ${especie}`;
        if (index < especies.length - 1) sql += ` OR`;
      });
      sql += `)`;
    }

    if (anos || especies) {
      sql += ` GROUP BY `;
      if (anos) sql += `year(emissao), `;
      if (especies) sql += `especie_popular_cientifico_id, `;
      sql = sql.slice(0, -2);
    }
    sql += `;`;
    const [rows] = await db.query(sql);
    res.json(rows[0]);
  } catch (error) {
    console.error("Erro na consulta básica:", error);
    res.status(500).json({ message: "Erro no servidor" });
  }
};

// Controlador para consulta intermediária - busca por municipios
export const getIntermediateData = async (req, res) => {
  const { anos, especies, municipios_destinatarios } = req.query;
  try {
    let sql = `SELECT `;
    if (anos) sql += `year(data_emissao) as ano, `;
    if (especies) sql += `especie_popular_cientifico_id, `;
    if (municipios_destinatarios)
      sql += `empreendimento_destinatario.municipio_id, `;
    sql += ` sum(volume) as volumetotal, sum(valor_total) as valortotal FROM gf1 `;

    if (municipios_destinatarios) {
      sql += `JOIN empreendimento ON (destinatario_id = empreendimento.id AND (`;
      municipios_destinatarios.forEach((municipio, index) => {
        sql += ` municipio_id = ${municipio}`;
        if (index < municipios_destinatarios.length - 1) sql += ` OR`;
      });
      sql += `)) `;
    }

    sql += `WHERE 1`;
    if (anos) {
      sql += ` AND (`;
      anos.forEach((ano, index) => {
        sql += ` year(data_emissao) = ${ano}`;
        if (index < anos.length - 1) sql += ` OR`;
      });
      sql += `)`;
    }

    if (especies) {
      sql += ` AND (`;
      especies.forEach((especie, index) => {
        sql += ` especie_popular_cientifico_id = ${especie}`;
        if (index < especies.length - 1) sql += ` OR`;
      });
      sql += `)`;
    }

    if (anos || especies) {
      sql += ` GROUP BY `;
      if (anos) sql += `year(emissao), `;
      if (especies) sql += `especie_popular_cientifico_id, `;
      if (municipios_destinatarios)
        sql += `empreendimento_destinatario.municipio_id, `;
      sql = sql.slice(0, -2);
    }
    sql += `;`;
    const [rows] = await db.query(sql);
    res.json(rows[0]);
  } catch (error) {
    console.error("Erro na consulta básica:", error);
    res.status(500).json({ message: "Erro no servidor" });
  }
};

// Controlador para consulta avançada - Busca por  ccsemas e lotes
export const getAdvancedData = async (req, res) => {
  const { anos, especies, municipios_destinatarios, ccsemas, lotes } =
    req.query;
  try {
    let sql = `SELECT `;

    if (anos) sql += `year(data_emissao) as ano, `;
    if (especies) sql += `especie_popular_cientifico_id, `;
    if (municipios_destinatarios)
      sql += `empreendimento_destinatario.municipio_id, `;
    if (ccsemas) sql += `ccsema_id, `;
    if (lotes) sql += `lote_id, `;

    sql += ` sum(volume) as volumetotal, sum(valor_total) as valortotal FROM gf1 `;

    if (municipios_destinatarios || ccsemas) {
      sql += `INNER JOIN empreendimento ON (destinatario_id = empreendimento.id AND (`;
      if (ccsemas)
        ccsemas.forEach((ccsema, index) => {
          sql += ` ccsema = ${ccsema}`;
          if (index < ccsemas.length - 1) sql += ` OR`;
        });
      if (municipios_destinatarios)
        municipios_destinatarios.forEach((municipio, index) => {
          sql += ` municipio_id = ${municipio}`;
          if (index < municipios_destinatarios.length - 1) sql += ` OR`;
        });
      sql += `)) `;
    }

    sql += `WHERE 1`;

    if (lotes) {
      sql += ` AND (`;
      lotes.forEach((lote, index) => {
        sql += ` lote_id = ${lote}`;
        if (index < lotes.length - 1) sql += ` OR`;
      });
      sql += `)`;
    }

    if (anos) {
      sql += ` AND (`;
      anos.forEach((ano, index) => {
        sql += ` year(data_emissao) = ${ano}`;
        if (index < anos.length - 1) sql += ` OR`;
      });
      sql += `)`;
    }

    if (especies) {
      sql += ` AND (`;
      especies.forEach((especie, index) => {
        sql += ` especie_popular_cientifico_id = ${especie}`;
        if (index < especies.length - 1) sql += ` OR`;
      });
      sql += `)`;
    }

    if (anos || especies || municipios_destinatarios || ccsemas || lotes) {
      sql += ` GROUP BY `;
      if (anos) sql += `year(emissao), `;
      if (especies) sql += `especie_popular_cientifico_id, `;
      if (municipios_destinatarios)
        sql += `empreendimento_destinatario.municipio_id, `;
      if (ccsemas) sql += `ccsema, `;
      sql = sql.slice(0, -2);
      if (lotes) sql += `, lote_id`;
    }
    sql += `;`;
    const [rows] = await db.query(sql);
    res.json(rows[0]);
  } catch (error) {
    console.error("Erro na consulta básica:", error);
    res.status(500).json({ message: "Erro no servidor" });
  }
};
