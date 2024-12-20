<template>
    <page-text :icon="icon" :title="title" :subtitle="subtitle" :text="text" />
</template>
<script setup lang="ts">
import { ref } from 'vue';
import PageText from '@/components/pages/PageText.vue'
const title = ref("Pesquisa e Desenvolvimento");
const icon = ref("mdi-school");
const subtitle = ref("Gerando soluções inovadoras e transferindo conhecimento para o mundo através da pesquisa e desenvolvimento na Unemat");
const text = ref([
    "A pesquisa e o desenvolvimento (P&D) são áreas fundamentais para a criação e aprimoramento de tecnologias, produtos e processos que impulsionam o desenvolvimento socioeconômico e ambiental. A Universidade do Estado de Mato Grosso (Unemat) é uma instituição que investe em P&D e tem como objetivo gerar conhecimento e transferi-lo para toda a sociedade, contribuindo para o desenvolvimento regional e global.",
    "A Unemat conta com programas de pós-graduação, laboratórios de pesquisa e projetos de extensão que visam à produção e difusão do conhecimento em diversas áreas do conhecimento. Os pesquisadores da universidade trabalham em colaboração com outras instituições de ensino, empresas, organizações governamentais e não governamentais, além de se envolverem com a comunidade local, a fim de gerar soluções inovadoras para os desafios atuais.",
    "A transferência de conhecimento gerado na Unemat para o mundo é feita por meio de diversas formas, como publicações científicas, patentes, eventos científicos, consultorias, cursos e treinamentos, entre outras. Essas iniciativas têm como objetivo disseminar o conhecimento produzido na universidade, promover a capacitação de profissionais e contribuir para a melhoria da qualidade de vida da população.",
    "Além disso, a Unemat tem parcerias internacionais com outras universidades e instituições de pesquisa, o que permite o intercâmbio de conhecimento e a colaboração em projetos de pesquisa e desenvolvimento. Essas parcerias são importantes para a internacionalização da universidade e para a inserção do conhecimento gerado na Unemat em uma perspectiva global.",
    "Em resumo, a Unemat investe em pesquisa e desenvolvimento, com o objetivo de gerar conhecimento e transferi-lo para toda a sociedade. A universidade utiliza diversas formas de transferência de conhecimento, como publicações científicas, patentes, eventos científicos, consultorias, cursos e treinamentos. Além disso, a Unemat tem parcerias internacionais, que permitem a colaboração em projetos de pesquisa e o intercâmbio de conhecimento. A transferência de conhecimento gerado na Unemat contribui para o desenvolvimento regional e global."
]);
</script>
