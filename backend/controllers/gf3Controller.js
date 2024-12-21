import db from '../config/db.js'; // Configuração do banco de dados

// Controlador para consulta básica
export const getBasicData = async (req, res) => {
  const { anos, especiesPopulares, especiesCientificas, produtos } = req.query;

  try {
    let query = `
      SELECT 
        'GF3' as gfTipo,
        SUM(volume) AS volumeTotal, 
        um.nome AS unidadeMedidaVolume, 
        SUM(valor_total) AS valorTotalEmReais
    `;

    const params = [];
    const groupByFields = [];

    // Função para garantir que o parâmetro seja sempre tratado como um array
    const ensureArray = (param) =>
      (Array.isArray(param) ? param : [param]).filter(Boolean);

    // Normalizar os parâmetros para arrays
    const anosArray = ensureArray(anos);
    const especiesPopularesArray = ensureArray(especiesPopulares);
    const especiesCientificasArray = ensureArray(especiesCientificas);
    const produtosArray = ensureArray(produtos);

    // Adicionar ano ao SELECT e GROUP BY se 'anos' estiver presente
    if (anosArray.length > 0) {
      query += `, YEAR(data_emissao) AS ano`;
      groupByFields.push('ano');
    }

    // Condicionar JOINs de acordo com os filtros recebidos
    let joins = `
      FROM gf3 gf
      INNER JOIN unidade_medida um ON um.id = gf.unidade_medida_id
      INNER JOIN produto pr ON pr.id = gf.produto_id
    `;

    // Adicionar JOIN de especie_popular_cientifico se 'especiesPopulares' ou 'especiesCientificas' estiver presente
    if (
      especiesPopularesArray.length > 0 ||
      especiesCientificasArray.length > 0
    ) {
      joins += `
        INNER JOIN especie_popular_cientifico epc ON epc.id = gf.especie_popular_cientifico_id
      `;
    }

    // Adicionar JOIN de especie_popular se 'especiesPopulares' estiver presente
    if (especiesPopularesArray.length > 0) {
      joins += `INNER JOIN especie_popular ep ON ep.id = epc.especie_popular_id`;
      query += `, ep.nome AS nomeEspeciePopular`;
      groupByFields.push('nomeEspeciePopular');
    }

    // Adicionar JOIN de especie_cientifico se 'especiesCientificas' estiver presente
    if (especiesCientificasArray.length > 0) {
      joins += `INNER JOIN especie_cientifico ec ON ec.id = epc.especie_cientifico_id`;
      query += `, ec.nome AS nomeEspecieCientifico`;
      groupByFields.push('nomeEspecieCientifico');
    }

    // Adicionar JOIN de produto se 'produtos' estiver presente
    if (produtosArray.length > 0) {
      query += `, pr.nome AS nomeProduto`;
      groupByFields.push('nomeProduto');
    }

    // Adicionar os JOINs ao início da query
    query += joins;

    // Adicionar o filtro WHERE após os JOINs
    query += ` WHERE pr.residuo = 0 -- Filtrar por produtos NÃO Residuais`;

    // Adicionar filtros condicionais
    if (anosArray.length > 0) {
      query += ` AND YEAR(data_emissao) IN (${anosArray
        .map(() => '?')
        .join(',')})`;
      params.push(...anosArray);
    }

    if (especiesPopularesArray.length > 0) {
      query += ` AND ep.id IN (${especiesPopularesArray
        .map(() => '?')
        .join(',')})`;
      params.push(...especiesPopularesArray);
    }

    if (especiesCientificasArray.length > 0) {
      query += ` AND ec.id IN (${especiesCientificasArray
        .map(() => '?')
        .join(',')})`;
      params.push(...especiesCientificasArray);
    }

    if (produtosArray.length > 0) {
      query += ` AND pr.id IN (${produtosArray.map(() => '?').join(',')})`;
      params.push(...produtosArray);
    }

    // Agrupar se necessário, com base nos parâmetros disponíveis
    if (groupByFields.length > 0) {
      query += ` GROUP BY ${groupByFields.join(', ')}`;
    }

    // Ordenar os resultados
    query += `
      ORDER BY 
        ano, volume_total_saida DESC;
    `;

    // Executar a consulta com os parâmetros
    const [rows] = await db.query(query, params);
    res.json(rows);
  } catch (error) {
    console.error('Erro na consulta:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
};

// Controlador para consulta intermediária
export const getIntermediateData = async (req, res) => {
  const {
    anos,
    especiesPopulares,
    especiesCientificas,
    produtos,
    municipiosRemetente,
    municipiosDestinatario,
  } = req.query;

  try {
    let query = `
      SELECT 
        'GF3' as gfTipo,
        SUM(volume) AS volumeTotal, 
        um.nome AS unidadeMedidaVolume, 
        SUM(valor_total) AS valorTotalEmReais
    `;

    const params = [];
    const groupByFields = [];

    // Função para garantir que o parâmetro seja sempre tratado como um array
    const ensureArray = (param) =>
      (Array.isArray(param) ? param : [param]).filter(Boolean);

    // Normalizar os parâmetros para arrays
    const anosArray = ensureArray(anos);
    const especiesPopularesArray = ensureArray(especiesPopulares);
    const especiesCientificasArray = ensureArray(especiesCientificas);
    const produtosArray = ensureArray(produtos);
    const municipiosRemetenteArray = ensureArray(municipiosRemetente);
    const municipiosDestinatarioArray = ensureArray(municipiosDestinatario);

    // Adicionar ano ao SELECT e GROUP BY se 'anos' estiver presente
    if (anosArray.length > 0) {
      query += `, YEAR(data_emissao) AS ano`;
      groupByFields.push('ano');
    }

    let joins = `
      FROM gf3 gf
      INNER JOIN unidade_medida um ON um.id = gf.unidade_medida_id
      INNER JOIN produto pr ON pr.id = gf.produto_id
    `;

    // Adicionar JOIN de especie_popular_cientifico se 'especiesPopulares' ou 'especiesCientificas' estiver presente
    if (
      especiesPopularesArray.length > 0 ||
      especiesCientificasArray.length > 0
    ) {
      joins += `
        INNER JOIN especie_popular_cientifico epc ON epc.id = gf.especie_popular_cientifico_id
      `;
    }

    // Adicionar JOIN de especie_popular se 'especiesPopulares' estiver presente
    if (especiesPopularesArray.length > 0) {
      joins += `INNER JOIN especie_popular ep ON ep.id = epc.especie_popular_id`;

      query += `, ep.nome AS nomeEspeciePopular`;
      groupByFields.push('nomeEspeciePopular');
    }

    // Adicionar JOIN de especie_cientifico se 'especiesCientificas' estiver presente
    if (especiesCientificasArray.length > 0) {
      joins += `INNER JOIN especie_cientifico ec ON ec.id = epc.especie_cientifico_id`;

      query += `, ec.nome AS nomeEspecieCientifico`;
      groupByFields.push('nomeEspecieCientifico');
    }

    // Adicionar produto ao SELECT e GROUP BY se 'produtos' estiver presente
    if (produtosArray.length > 0) {
      query += `, pr.nome AS nomeProduto`;
      groupByFields.push('nomeProduto');
    }

    // Adicionar município remetente ao SELECT e GROUP BY se 'municipiosRemetente' estiver presente
    if (
      municipiosRemetenteArray.length > 0 ||
      municipiosDestinatarioArray.length > 0
    ) {
      joins += `
        INNER JOIN 
          empreendimento e_remetente ON e_remetente.id = gf.remetente_id
        INNER JOIN 
          municipio m_remetente ON m_remetente.id = e_remetente.municipio_id
        INNER JOIN 
          empreendimento e_destinatario ON e_destinatario.id = gf.destinatario_id
        INNER JOIN 
          municipio m_destinatario ON m_destinatario.id = e_destinatario.municipio_id
      `;

      query += `, m_remetente.nome AS nomeMunicipioRemetente`;
      groupByFields.push('nomeMunicipioRemetente');

      query += `, m_destinatario.nome AS nomeMunicipioDestinatario`;
      groupByFields.push('nomeMunicipioDestinatario');
    }

    // Adicionar os JOINs ao início da query
    query += joins;

    // Adicionar o filtro WHERE após os JOINs
    query += ` WHERE pr.residuo = 0 -- Filtrar por produtos NÃO Residuais`;

    // Adicionar filtros condicionais
    if (anosArray.length > 0) {
      query += ` AND YEAR(data_emissao) IN (${anosArray
        .map(() => '?')
        .join(',')})`;
      params.push(...anosArray);
    }

    if (especiesPopularesArray.length > 0) {
      query += ` AND ep.id IN (${especiesPopularesArray
        .map(() => '?')
        .join(',')})`;
      params.push(...especiesPopularesArray);
    }

    if (especiesCientificasArray.length > 0) {
      query += ` AND ec.id IN (${especiesCientificasArray
        .map(() => '?')
        .join(',')})`;
      params.push(...especiesCientificasArray);
    }

    if (produtosArray.length > 0) {
      query += ` AND pr.id IN (${produtosArray.map(() => '?').join(',')})`;
      params.push(...produtosArray);
    }

    if (municipiosRemetenteArray.length > 0) {
      query += ` AND m_remetente.id IN (${municipiosRemetenteArray
        .map(() => '?')
        .join(',')})`;
      params.push(...municipiosRemetenteArray);
    }

    if (municipiosDestinatarioArray.length > 0) {
      query += ` AND m_destinatario.id IN (${municipiosDestinatarioArray
        .map(() => '?')
        .join(',')})`;
      params.push(...municipiosDestinatarioArray);
    }

    // Agrupar se necessário, com base nos parâmetros disponíveis
    if (groupByFields.length > 0) {
      query += ` GROUP BY ${groupByFields.join(', ')}`;
    }

    // Ordenar os resultados
    query += `
      ORDER BY 
        ano, volume_total_saida DESC;
    `;

    // Executar a consulta com os parâmetros
    const [rows] = await db.query(query, params);
    res.json(rows);
  } catch (error) {
    console.error('Erro na consulta:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
};

// Controlador para consulta avançada
export const getAdvancedData = async (req, res) => {
  const {
    anos,
    especiesPopulares,
    especiesCientificas,
    produtos,
    municipiosRemetente,
    municipiosDestinatario,
    ccsemasRemetente,
  } = req.query;

  try {
    let query = `
      SELECT 
        'GF3' as gfTipo,
        SUM(volume) AS volumeTotal, 
        um.nome AS unidadeMedidaVolume, 
        SUM(valor_total) AS valorTotalEmReais,
    `;

    const params = [];
    const groupByFields = [];

    // Função para garantir que o parâmetro seja sempre tratado como um array
    const ensureArray = (param) =>
      (Array.isArray(param) ? param : [param]).filter(Boolean);

    // Normalizar os parâmetros para arrays
    const anosArray = ensureArray(anos);
    const especiesPopularesArray = ensureArray(especiesPopulares);
    const especiesCientificasArray = ensureArray(especiesCientificas);
    const produtosArray = ensureArray(produtos);
    const municipiosRemetenteArray = ensureArray(municipiosRemetente);
    const municipiosDestinatarioArray = ensureArray(municipiosDestinatario);
    const ccsemasRemetenteArray = ensureArray(ccsemasRemetente);

    // Adicionar ano ao SELECT e GROUP BY se 'anos' estiver presente
    if (anosArray.length > 0) {
      query += `, YEAR(data_emissao) AS ano`;
      groupByFields.push('ano');
    }

    let joins = `
      FROM gf3 gf
      INNER JOIN unidade_medida um ON um.id = gf.unidade_medida_id
      INNER JOIN produto pr ON pr.id = gf.produto_id
    `;

    // Adicionar JOIN de especie_popular_cientifico se 'especiesPopulares' ou 'especiesCientificas' estiver presente
    if (
      especiesPopularesArray.length > 0 ||
      especiesCientificasArray.length > 0
    ) {
      joins += `
        INNER JOIN especie_popular_cientifico epc ON epc.id = gf.especie_popular_cientifico_id
      `;
    }

    // Adicionar JOIN de especie_popular se 'especiesPopulares' estiver presente
    if (especiesPopularesArray.length > 0) {
      joins += `INNER JOIN especie_popular ep ON ep.id = epc.especie_popular_id`;

      query += `, ep.nome AS nomeEspeciePopular`;
      groupByFields.push('nomeEspeciePopular');
    }

    // Adicionar JOIN de especie_cientifico se 'especiesCientificas' estiver presente
    if (especiesCientificasArray.length > 0) {
      joins += `INNER JOIN especie_cientifico ec ON ec.id = epc.especie_cientifico_id`;

      query += `, ec.nome AS nomeEspecieCientifico`;
      groupByFields.push('nomeEspecieCientifico');
    }

    // Adicionar produto ao SELECT e GROUP BY se 'produtos' estiver presente
    if (produtosArray.length > 0) {
      query += `, pr.nome AS nomeProduto`;
      groupByFields.push('nomeProduto');
    }

    // Adicionar município remetente ao SELECT e GROUP BY se 'municipiosRemetente' estiver presente
    if (
      municipiosRemetenteArray.length > 0 ||
      municipiosDestinatarioArray.length > 0
    ) {
      joins += `
        INNER JOIN 
          empreendimento e_remetente ON e_remetente.id = gf.remetente_id
        INNER JOIN 
          municipio m_remetente ON m_remetente.id = e_remetente.municipio_id
        INNER JOIN 
          empreendimento e_destinatario ON e_destinatario.id = gf.destinatario_id
        INNER JOIN 
          municipio m_destinatario ON m_destinatario.id = e_destinatario.municipio_id
      `;

      query += `, m_remetente.nome AS nomeMunicipioRemetente`;
      groupByFields.push('nomeMunicipioRemetente');

      query += `, m_destinatario.nome AS nomeMunicipioDestinatario`;
      groupByFields.push('nomeMunicipioDestinatario');
    }

    // Adicionar ccsema remetente ao SELECT e GROUP BY se 'ccsemasRemetente' estiver presente
    if (ccsemasRemetenteArray.length > 0) {
      query += `, e_remetente.ccsema AS ccsemaRemetente`;
      groupByFields.push('ccsemaRemetente');
    }

    // Adicionar os JOINs ao início da query
    query += joins;

    // Adicionar o filtro WHERE após os JOINs
    query += ` WHERE pr.residuo = 0 -- Filtrar por produtos NÃO Residuais`;

    // Adicionar filtros condicionais
    if (anosArray.length > 0) {
      query += ` AND YEAR(data_emissao) IN (${anosArray
        .map(() => '?')
        .join(',')})`;
      params.push(...anosArray);
    }

    if (especiesPopularesArray.length > 0) {
      query += ` AND ep.id IN (${especiesPopularesArray
        .map(() => '?')
        .join(',')})`;
      params.push(...especiesPopularesArray);
    }

    if (especiesCientificasArray.length > 0) {
      query += ` AND ec.id IN (${especiesCientificasArray
        .map(() => '?')
        .join(',')})`;
      params.push(...especiesCientificasArray);
    }

    if (produtosArray.length > 0) {
      query += ` AND pr.id IN (${produtosArray.map(() => '?').join(',')})`;
      params.push(...produtosArray);
    }

    if (municipiosRemetenteArray.length > 0) {
      query += ` AND m_remetente.id IN (${municipiosRemetenteArray
        .map(() => '?')
        .join(',')})`;
      params.push(...municipiosRemetenteArray);
    }

    if (municipiosDestinatarioArray.length > 0) {
      query += ` AND m_destinatario.id IN (${municipiosDestinatarioArray
        .map(() => '?')
        .join(',')})`;
      params.push(...municipiosDestinatarioArray);
    }

    if (ccsemasRemetenteArray.length > 0) {
      query += ` AND e_remetente.ccsema IN (${ccsemasRemetenteArray
        .map(() => '?')
        .join(',')})`;
      params.push(...ccsemasRemetenteArray);
    }

    // Agrupar se necessário, com base nos parâmetros disponíveis
    if (groupByFields.length > 0) {
      query += ` GROUP BY ${groupByFields.join(', ')}`;
    }

    // Ordenar os resultados
    query += `
      ORDER BY 
        ano, volume_total_saida DESC;
    `;

    // Executar a consulta com os parâmetros
    const [rows] = await db.query(query, params);
    res.json(rows);
  } catch (error) {
    console.error('Erro na consulta:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
};
