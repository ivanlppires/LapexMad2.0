<template>
    <page-text :icon="icon" :title="title" :subtitle="subtitle" :text="text" />
</template>
<script setup lang="ts">
import { ref } from 'vue';
import PageText from '@/components/pages/PageText.vue'
const icon = ref('mdi-chart-timeline-variant-shimmer');
const title = ref("Origem das informações");
const subtitle = ref("Conheça a origem confiável dos dados apresentados neste sistema online.");
const text = ref([
    "Os dados apresentados no website têm sua origem na SEMA (Secretaria de Meio Ambiente) do estado de Mato Grosso, por meio de seus sistemas online. A SEMA é responsável por gerenciar e proteger o meio ambiente no estado, além de promover a sustentabilidade e o desenvolvimento socioeconômico de forma responsável.",
    "Os sistemas online da SEMA foram desenvolvidos para fornecer informações atualizadas e precisas sobre as atividades relacionadas ao meio ambiente no estado. Esses sistemas coletam e armazenam dados de diversas fontes, como empresas, organizações governamentais e não governamentais, instituições de pesquisa e cidadãos.",
    "Os dados coletados pela SEMA são diversos e abrangem áreas como desmatamento, queimadas, licenciamento ambiental, gestão de resíduos, recursos hídricos, entre outros. Esses dados são usados para monitorar a situação ambiental do estado, identificar problemas e tomar medidas preventivas e corretivas.",
    "Ao disponibilizar esses dados em seu website, a SEMA promove a transparência e a participação cidadã no monitoramento e na gestão ambiental do estado. Qualquer pessoa pode acessar as informações e utilizá-las para tomar decisões informadas e contribuir para a proteção do meio ambiente em Mato Grosso.",
    "Em resumo, a origem dos dados apresentados no website é a SEMA, que coleta e armazena informações sobre o meio ambiente em Mato Grosso por meio de seus sistemas online. Esses dados são fundamentais para monitorar e gerenciar as atividades relacionadas ao meio ambiente no estado, e sua disponibilização na internet promove a transparência e a participação cidadã."
]);

</script>