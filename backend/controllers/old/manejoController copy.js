import db from "../config/db.js";

// Controlador para consulta básica - totais
export const getBasicData = async (req, res) => {
  const { anos, especies } = req.query;
  try {
    let sql = `SELECT `;
    if (anos) sql += `lote.ano, `;
    if (especies) sql += `especie_popular_cientifico_id, `;
    sql += `sum(volume_m3_por_upa_liquida) as volume_autorizado, sum(volume_utilizado) as volume_utilizado, sum(volume_disponivel) as volume_disponivel, sum(volume_reservado) as volume_reservado FROM credito `;
    if (anos) {
      sql += `  INNER JOIN lote ON( lote_id = lote.id AND (`;
      anos.forEach((year, index) => {
        sql += ` lote.ano = ${year}`;
        if (index < anos.length - 1) sql += ` OR`;
      });
      sql += `))`;
    }
    sql += ` WHERE 1`;
    if (especies) {
      sql += ` AND (`;
      especies.forEach((specie, index) => {
        sql += ` especie_popular_cientifico_id = ${specie}`;
        if (index < especies.length - 1) sql += ` OR`;
      });
      sql += `)`;
    }
    if (anos || especies) {
      sql += ` GROUP BY `;
      if (anos) sql += `lote.ano, `;
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
  const { anos, especies, municipios_remetentes } = req.query;
  try {
    let sql = `SELECT `;
    if (anos) sql += `lote.ano, `;
    if (especies) sql += `especie_popular_cientifico_id, `;
    if (municipios_remetentes) sql += `municipio_remetente_id, `;
    sql += `sum(volume_m3_por_upa_liquida) as volume_autorizado, sum(volume_utilizado) as volume_utilizado, sum(volume_disponivel) as volume_disponivel, sum(volume_reservado) as volume_reservado FROM credito `;
    if (anos) {
      sql += `  INNER JOIN lote ON( lote_id = lote.id AND (`;
      anos.forEach((year, index) => {
        sql += ` lote.ano = ${year}`;
        if (index < anos.length - 1) sql += ` OR`;
      });
      sql += `))`;
    }
    if (municipios_remetentes){
      sql += ` INNER JOIN gf1 ON (credito.lote_id = gf1.lote_id)`;
      sql += ` INNER JOIN empreendimento ON (gf1.remetente_id = empreendimento.id)`; 
    }
    sql += ` WHERE 1`;
    if (especies) {
      sql += ` AND (`;
      especies.forEach((specie, index) => {
        sql += ` especie_popular_cientifico_id = ${specie}`;
        if (index < especies.length - 1) sql += ` OR`;
      });
      sql += `)`;
    }
    if (municipios_remetentes) {
      sql += ` AND (`;
      municipios_remetentes.forEach((municipio, index) => {
        sql += ` empreendimento.municipio_id = ${municipio}`;
        if (index < municipios_remetentes.length - 1) sql += ` OR`;
      });
      sql += `)`;
    }
    if (anos || especies || municipios_remetentes) {
      sql += ` GROUP BY `;
      if (anos) sql += `lote.ano, `;
      if (especies) sql += `especie_popular_cientifico_id, `;
      if (municipios_remetentes) sql += `empreendimento.municipio_id, `;
      sql = sql.slice(0, -2);
    }
    sql += `;`;
    const [rows] = await db.query(sql);
    res.json(rows[0]);
  } catch (error) {
    console.error("Erro na consulta intermediária:", error);
    res.status(500).json({ message: "Erro no servidor" });
  }
};

// Controlador para consulta avançada - Busca por  ccsemas, municipio_remetente e lotes
export const getAdvancedData = async (req, res) => {
  const { anos, especies, lotes, ccsemas, municipios_remetentes } = req.query;
  try {
    let sql = `SELECT `;
    if (anos) sql += `lote.ano, `;
    if (lotes) sql += `lote_id, `;
    if (ccsemas) sql += `empreendimento.ccsema, `;
    if (especies) sql += `especie_popular_cientifico_id, `;
    if (municipios_remetentes) sql += `municipio_remetente_id, `;
    sql += `sum(volume_m3_por_upa_liquida) as volume_autorizado, sum(volume_utilizado) as volume_utilizado, sum(volume_disponivel) as volume_disponivel, sum(volume_reservado) as volume_reservado FROM credito `;
    if (anos) {
      sql += `  INNER JOIN lote ON( lote_id = lote.id AND (`;
      anos.forEach((year, index) => {
        sql += ` lote.ano = ${year}`;
        if (index < anos.length - 1) sql += ` OR`;
      });
      sql += `))`;
    }
    if (municipios_remetentes || ccsemas){
      sql += ` INNER JOIN gf1 ON (credito.lote_id = gf1.lote_id)`;
      sql += ` INNER JOIN empreendimento ON (gf1.remetente_id = empreendimento.id)`; 
    }
    sql += ` WHERE 1`;
    if (lotes) {
      sql += ` AND (`;
      lotes.forEach((lote, index) => {
        sql += ` lote_id = ${lote}`;
        if (index < lotes.length - 1) sql += ` OR`;
      });
      sql += `)`;
    }
    if(ccsemas){
      sql += ` AND (`;
      ccsemas.forEach((ccsema, index) => {
        sql += ` empreendimento.ccsema = ${ccsema}`;
        if (index < ccsemas.length - 1) sql += ` OR`;
      });
      sql += `)`;
    }
    if (especies) {
      sql += ` AND (`;
      especies.forEach((specie, index) => {
        sql += ` especie_popular_cientifico_id = ${specie}`;
        if (index < especies.length - 1) sql += ` OR`;
      });
      sql += `)`;
    }
    if (municipios_remetentes) {
      sql += ` AND (`;
      municipios_remetentes.forEach((municipio, index) => {
        sql += ` empreendimento.municipio_id = ${municipio}`;
        if (index < municipios_remetentes.length - 1) sql += ` OR`;
      });
      sql += `)`;
    }
    if (anos || especies || municipios_remetentes || lotes || ccsemas) {
      sql += ` GROUP BY `;
      if (anos) sql += `lote.ano, `;
      if (especies) sql += `especie_popular_cientifico_id, `;
      if (municipios_remetentes) sql += `empreendimento.municipio_id, `;
      if (lotes) sql += `lote_id, `;
      if (ccsemas) sql += `empreendimento.ccsema, `;
      sql = sql.slice(0, -2);
    }
    sql += `;`;
    const [rows] = await db.query(sql);
    res.json(rows[0]);
  } catch (error) {
    console.error("Erro na consulta intermediária:", error);
    res.status(500).json({ message: "Erro no servidor" });
  }
};
