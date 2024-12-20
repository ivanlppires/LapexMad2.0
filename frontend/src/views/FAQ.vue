<template>
    <v-card elevation="0" class="ma-0 pa-0" border>
        <v-card-title class="bg-teal-darken-3">
            <v-icon>mdi-forum</v-icon>
            Perguntas e Respostas Frequentes
        </v-card-title>
        <v-card-subtitle class="bg-grey-lighten-3 pa-3 font-italic">
            Aqui você encontra as perguntas e respostas mais frequentes sobre o sistema.
        </v-card-subtitle>
        <v-card-text>
            <v-expansion-panels variant="accordion">
                <v-expansion-panel v-for="(qa,index) in qas" :key="index" :title="qa.question" color="grey-lighten-4"
                    :text="qa.answer"></v-expansion-panel>
            </v-expansion-panels>
        </v-card-text>
    </v-card>
</template>
<script setup lang="ts">
import { ref } from "vue";

const qas = ref([
    {question: "O que é o sistema de exportação de madeira?", answer: "O sistema de exportação de madeira é um sistema de informação que permite o acompanhamento da exportação de madeira do Brasil."},
    {question: "Quem pode utilizar o sistema de exportação de madeira?", answer: "Qualquer pessoa física ou jurídica que deseja acompanhar a exportação de madeira do Brasil."},
    {question: "Quais são os requisitos para utilizar o sistema de exportação de madeira?", answer: "Para utilizar o sistema de exportação de madeira é necessário ter um cadastro no sistema."},
    {question: "Como faço para me cadastrar no sistema de exportação de madeira?", answer: "Para se cadastrar no sistema de exportação de madeira é necessário preencher o formulário de cadastro disponível no site."},
    {question: "Como faço para acompanhar a exportação de madeira?", answer: "Para acompanhar a exportação de madeira é necessário ter um cadastro no sistema e fazer o login no sistema."},
    {question: "Como faço para recuperar a senha do sistema de exportação de madeira?", answer: "Para recuperar a senha do sistema de exportação de madeira é necessário preencher o formulário de recuperação de senha disponível no site."},
    {question: "Como faço para alterar a senha do sistema de exportação de madeira?", answer: "Para alterar a senha do sistema de exportação de madeira é necessário fazer o login no sistema e acessar a página de alteração de senha."},
    {question: "O que é um guia florestal?", answer: "Um guia florestal é um documento que acompanha a exportação de madeira e contém informações sobre a origem da madeira."},
    {question: "Qual é a diferença entre guia florestal 1 e guia florestal 3?", answer: "O guia florestal 1 é um guia florestal que acompanha a exportação de madeira de origem florestal e o guia florestal 3 é um guia florestal que acompanha a exportação de madeira de origem não florestal."},

]);

</script>