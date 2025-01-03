import db from "../config/db.js"; // Configuração do banco de dados

// Controlador para consulta básica - anos e produtos
export const getBasicData = async (req, res) => {
  const { anos, produtos } = req.query;
  try {
    let sql = `SELECT `;
    if (anos) sql += `ano, `;
    if (produtos) sql += `produto_id, `;
    sql += `sum(volume) as volumetotal, sum(valor_total) as valortotal FROM exportacao_mt `;
    sql += `WHERE 1`;
    if (anos) {
      sql += " AND (";
      anos.forEach((ano, index) => {
        sql += ` year(data_emissao) = ${ano}`;
        if (index < anos.length - 1) sql += " OR";
      });
      sql += ")";
    }
    if (produtos) {
      sql += " AND (";
      produtos.forEach((produto, index) => {
        sql += ` produto_id = ${produto}`;
        if (index < produtos.length - 1) sql += " OR";
      });
      sql += ")";
    }

    const [rows] = await db.query(sql);
    res.json(rows[0]);
  } catch (error) {
    console.error("Erro na consulta básica:", error);
    res.status(500).json({ message: "Erro no servidor" });
  }
};

// Controlador para consulta intermediária - especies e municipios
export const getIntermediateData = async (req, res) => {
  const { anos, produtos, especies, municipios_remetentes } = req.query;
  try {
    let sql = `SELECT `;
    if (anos) sql += `ano, `;
    if (produtos) sql += `produto_id, `;
    if (especies) sql += `especie_popular_cientifico_id , `;
    if (municipios_remetentes) sql += `empreendimento.municipio_id, `;

    sql += `sum(volume) as volumetotal, sum(valor_total) as valortotal FROM exportacao_mt ` ;

    if (municipios_remetentes) {
      sql += ` INNER JOIN empreendimento ON (remetente_id = empreendimento.id AND (`;
      municipios_remetentes.forEach((municipio, index) => {
        sql += ` municipio_id = ${municipio}`;
        if (index < municipios_remetentes.length - 1) sql += ` OR`;
      });
      sql += `)) `;
    }

    sql += `WHERE 1`;
    if (anos) {
      sql += " AND (";
      anos.forEach((ano, index) => {
        sql += ` year(data_emissao) = ${ano}`;
        if (index < anos.length - 1) sql += " OR";
      });
      sql += ")";
    }
    if (produtos) {
      sql += " AND (";
      produtos.forEach((produto, index) => {
        sql += ` produto_id = ${produto}`;
        if (index < produtos.length - 1) sql += " OR";
      });
      sql += ")";
    }
    if (especies) {
      sql += " AND (";
      especies.forEach((especie, index) => {
        sql += ` especie_popular_cientifico_id = ${especie}`;
        if (index < especies.length - 1) sql += " OR";
      });
      sql += ")";
    }

    if(anos || produtos || especies || municipios_remetentes){
      sql += " GROUP BY ";
      if (anos) sql += `ano, `;
      if (produtos) sql += `produto_id, `;
      if (especies) sql += `especie_popular_cientifico_id, `;
      if (municipios_remetentes) sql += `empreendimento.municipio_id, `;
      sql = sql.slice(0, -2);
    }

    const [rows] = await db.query(sql);
    res.json(rows[0]);
  } catch (error) {
    console.error("Erro na consulta básica:", error);
    res.status(500).json({ message: "Erro no servidor" });
  }
};

// Controlador para consulta avançada - ccsemas e lotes
export const getAdvancedData = async (req, res) => {
  const { anos, produtos, especies, municipios_remetentes, ccsemas, lotes } = req.query;
  try {
    let sql = `SELECT `;
    if (anos) sql += `ano, `;
    if (produtos) sql += `produto_id, `;
    if (especies) sql += `especie_popular_cientifico_id , `;
    if (municipios_remetentes) sql += `empreendimento.municipio_id, `;
    if (ccsemas) sql += `ccsema, `;
    if (lotes) sql += `lote_id, `;

    sql += `sum(volume) as volumetotal, sum(valor_total) as valortotal FROM exportacao_mt ` ;

    if (municipios_remetentes) {
      sql += ` INNER JOIN empreendimento ON (remetente_id = empreendimento.id AND (`;
      municipios_remetentes.forEach((municipio, index) => {
        sql += ` municipio_id = ${municipio}`;
        if (index < municipios_remetentes.length - 1) sql += ` OR`;
      });
      sql += `)) `;
    }

    sql += `WHERE 1`;
    if (anos) {
      sql += " AND (";
      anos.forEach((ano, index) => {
        sql += ` year(data_emissao) = ${ano}`;
        if (index < anos.length - 1) sql += " OR";
      });
      sql += ")";
    }
    if (produtos) {
      sql += " AND (";
      produtos.forEach((produto, index) => {
        sql += ` produto_id = ${produto}`;
        if (index < produtos.length - 1) sql += " OR";
      });
      sql += ")";
    }
    if (especies) {
      sql += " AND (";
      especies.forEach((especie, index) => {
        sql += ` especie_popular_cientifico_id = ${especie}`;
        if (index < especies.length - 1) sql += " OR";
      });
      sql += ")";
    }

    if(anos || produtos || especies || municipios_remetentes){
      sql += " GROUP BY ";
      if (anos) sql += `ano, `;
      if (produtos) sql += `produto_id, `;
      if (especies) sql += `especie_popular_cientifico_id, `;
      if (municipios_remetentes) sql += `empreendimento.municipio_id, `;
      sql = sql.slice(0, -2);
    }

    const [rows] = await db.query(sql);
    res.json(rows[0]);
  } catch (error) {
    console.error("Erro na consulta básica:", error);
    res.status(500).json({ message: "Erro no servidor" });
  }
};
