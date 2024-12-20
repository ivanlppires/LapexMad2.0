<template>
    <page-text :icon="icon" :title="title" :subtitle="subtitle" :text="text" />
</template>
<script setup lang="ts">
import { ref } from 'vue';
import PageText from '@/components/pages/PageText.vue'

const title = ref("Política de Atualização dos Dados");
const icon = ref("mdi-refresh-circle");
const subtitle = ref("Conheça a política de atualização dos dados apresentados neste sistema online.");
const text = ref([
    "A política de atualização dos dados apresentados nete sistema online é fundamental para garantir que as informações disponibilizadas sejam confiáveis e atualizadas.A SEMA(Secretaria de Meio Ambiente) do estado de Mato Grosso, responsável pela coleta e armazenamento desses dados, segue uma política de atualização regular, a fim de manter as informações atualizadas e precisas.",
    "Os dados são atualizados periodicamente conforme a demanda, durante a vigência do projeto que fundamenta este sistema. A SEMA trabalha em estreita colaboração com outras agências governamentais, organizações não governamentais e instituições de pesquisa para garantir que as informações apresentadas no website reflitam com precisão a situação ambiental do estado.",
    "Além disso, a SEMA incentiva a participação cidadã na atualização dos dados. Qualquer pessoa pode relatar informações relevantes sobre o meio ambiente em Mato Grosso, que serão avaliadas e incluídas nos dados disponíveis no website. Essa colaboração é essencial para garantir que as informações sejam atualizadas e precisas.",
    "A política de atualização dos dados também inclui medidas para garantir a segurança dos dados. A SEMA trabalha com sistemas de proteção de dados para garantir que as informações coletadas sejam armazenadas de forma segura e confidencial. A política de privacidade da SEMA garante que as informações pessoais coletadas sejam usadas apenas para fins específicos e que a privacidade dos usuários seja respeitada.",
    "Em resumo, a política de atualização dos dados apresentados neste sistema é baseada na demanda e na vigência do projeto que fundamenta o sistema. A SEMA trabalha com outras agências governamentais, organizações não governamentais e instituições de pesquisa para garantir que as informações apresentadas sejam atualizadas e precisas. A participação cidadã é incentivada e a segurança dos dados é garantida por meio de medidas de proteção e privacidade."
]);

</script>