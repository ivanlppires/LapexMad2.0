<template>
    <v-card class="pa-2">
        <v-card-title>PROJETO LAPEXMAD</v-card-title>
        <v-card-subtitle>Informações sobre o projeto</v-card-subtitle>
        <v-card-text class="text-justify pa-2">
            <p class="pa-2">O Projeto LAPEXMAD atua sobre o Levantamento, Análise de mercado,
                Produção, Exportação
                e importação do setor Madereiro de Mato Grosso</p>
            <p class="pa-2">Este projeto é realizado pela a <a href="https://www.unemat.br/">UNEMAT</a> -
                Universidade do Estado de Mato Grosso em parceria com o <a
                    href="https://www.sindusmad.com.br/">SINDUSMAD</a> - Sindicato das
                Indústrias Madereiras e o <a href="https://cipem.org.br/">CIPEM</a> - Centro das
                Indústrias Produtoras e Exportadoras de
                Madeira do estado de Mato Grosso.</p>
            <p class="pa-2">Utilize seu email e senha para <a href="#" @click="$emit('setTab', 'login')">acessar</a> os
                dados
                do projeto. Caso não tenha cadastro, utilize a opção <a href="#"
                    @click="$emit('setTab', 'register')">Cadastrar</a> e
                registre-se para ter acesso. Você
                também pode utilizar a
                sua conta do Google ou Facebook para acessar ao sistema.</p>
        </v-card-text>
        <v-card-actions>
            <v-btn color="success" @click="$emit('setTab', 'login')">Autenticar</v-btn>
            <v-spacer />
            <v-btn color="success" @click="$emit('setTab', 'register')">Cadastrar</v-btn>
        </v-card-actions>
    </v-card>
</template>