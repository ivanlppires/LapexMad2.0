import { select, from, where, group, limit, order, execute } from "../utils/query.js";

// Controlador para consulta básica - totais por ano e especies

export const getBasicData = async (req, res) => {
  try {
    const { anos, especies } = req.query;

    const columns = [
      ...(anos ? ["year(data_emissao) as ano"] : []),
      ...(especies ? ["especie_popular_cientifico_id"] : []),
      "sum(volume) as volumetotal",
      "sum(valor_total) as valortotal"
    ];

    let sql = select(columns) + from("gf1");

    if (anos || especies) {
      const conditions = [];
      if (anos) conditions.push({ "year(data_emissao)": anos });
      if (especies) conditions.push({ "especie_popular_cientifico_id": especies });

      sql += where(conditions);
      sql += group(["year(data_emissao)", "especie_popular_cientifico_id"]);
    }

    const data = await execute(sql);
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// Controlador para consulta intermediária - busca por municipios
export const getIntermediateData = async (req, res) => {
  try {
    const { anos, especies, municipios_destinatarios } = req.query;

    const columns = [
      ...(anos ? ["year(data_emissao) as ano"] : []),
      ...(especies ? ["especie_popular_cientifico_id"] : []),
      ...(municipios_destinatarios ? ["empreendimento.municipio_id"] : []),
      "sum(volume) as volumetotal",
      "sum(valor_total) as valortotal"
    ];

    let sql = select(columns) + from("gf1");

    if (municipios_destinatarios) {
      sql += ` JOIN empreendimento ON (gf1.destinatario_id = empreendimento.id)`;
      sql += where(
        municipios_destinatarios.map((municipio) => ({ "empreendimento.municipio_id": municipio }))
      );
    }

    const conditions = [];
    if (anos) conditions.push({ "year(data_emissao)": anos });
    if (especies) conditions.push({ "especie_popular_cientifico_id": especies });

    if (conditions.length) sql += where(conditions);

    if (anos || especies || municipios_destinatarios) {
      const groupByColumns = [
        ...(anos ? ["year(data_emissao)"] : []),
        ...(especies ? ["especie_popular_cientifico_id"] : []),
        ...(municipios_destinatarios ? ["empreendimento.municipio_id"] : [])
      ];
      sql += group(groupByColumns);
    }

    const data = await execute(sql);
    res.json(data);
  } catch (error) {
    console.error("Error fetching intermediate data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controlador para consulta avançada - Busca por  ccsemas e lotes
export const getAdvancedData = async (req, res) => {
  try {
    const { anos, especies, municipios_destinatarios, ccsemas, lotes } = req.query;

    const columns = [
      ...(anos ? ["year(data_emissao) as ano"] : []),
      ...(especies ? ["especie_popular_cientifico_id"] : []),
      ...(municipios_destinatarios ? ["empreendimento.municipio_id"] : []),
      ...(ccsemas ? ["ccsema_id"] : []),
      ...(lotes ? ["lote_id"] : []),
      "sum(volume) as volumetotal",
      "sum(valor_total) as valortotal"
    ];

    let sql = select(columns) + from("gf1");

    if (municipios_destinatarios || ccsemas) {
      sql += ` JOIN empreendimento ON (gf1.destinatario_id = empreendimento.id)`;
      const joinConditions = [];
      if (ccsemas) joinConditions.push(...ccsemas.map((ccsema) => ({ "empreendimento.ccsema": ccsema })));
      if (municipios_destinatarios)
        joinConditions.push(
          ...municipios_destinatarios.map((municipio) => ({ "empreendimento.municipio_id": municipio }))
        );
      sql += where(joinConditions);
    }

    const conditions = [];
    if (anos) conditions.push({ "year(data_emissao)": anos });
    if (especies) conditions.push({ "especie_popular_cientifico_id": especies });
    if (lotes) conditions.push({ "lote_id": lotes });

    if (conditions.length) sql += where(conditions);

    if (anos || especies || municipios_destinatarios || ccsemas || lotes) {
      const groupByColumns = [
        ...(anos ? ["year(data_emissao)"] : []),
        ...(especies ? ["especie_popular_cientifico_id"] : []),
        ...(municipios_destinatarios ? ["empreendimento.municipio_id"] : []),
        ...(ccsemas ? ["ccsema_id"] : []),
        ...(lotes ? ["lote_id"] : [])
      ];
      sql += group(groupByColumns);
    }

    const data = await execute(sql);
    res.json(data);
  } catch (error) {
    console.error("Error fetching advanced data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
