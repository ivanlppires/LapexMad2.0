<template>
    <v-row>
        <v-col align-self="center" v-for="card in cards" :key="card.title" cols="12" xl="3" lg="4" md="4" sm="6"
            xs="12">
            <v-card elevation="3" class="hover-scale" :to="card.link">
                <v-img class="align-end text-white img" height="150" :src="'./src/assets/' + card.image" cover>
                    <v-card-title class="text-h5 break-line bg-title py-3">{{ card.title }}</v-card-title>
                </v-img>
                <v-card-text>
                    <v-row>
                        <v-col cols="2" lg="1" class="icon-left">
                            <v-icon class="text-h3 text-blue-grey-lighten-2 pr-4  info">mdi-database-search-outline</v-icon>
                        </v-col>
                        <v-col>
                            <span class="text-h4 font-weight-black text-blue-grey-lighten-2 aldrich-regular info"
                                style="line-height: 1;">
                                {{ Math.floor(Math.random() * (1000000 - 10000 + 1)) + 10000 }}
                            </span>
                            <span class="text-blue-grey-lighten-1 d-block  info" style="font-size:1.1rem; line-height: 1;">
                                Registros de {{ card.title.toLocaleLowerCase() }}</span>
                        </v-col>
                        <v-col cols="12" class="ml-2">
                            <div class="text-medium-emphasis no-wrap ">
                                <v-icon>mdi-information-outline</v-icon>
                                {{ card.description }}
                            </div>
                            <div class="text-medium-emphasis">
                                <v-icon>mdi-calendar</v-icon>
                                Intervalo dos dados: {{ card.interval }}
                            </div>
                            <div class="text-medium-emphasis">
                                <v-icon>mdi-history</v-icon>
                                Última atualização: {{ card.lastUpdate }}
                            </div>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="teal" block variant="outlined">Consultar</v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>

</template>
<script setup>
import { ref } from 'vue';
// display name vuetify breakpoint
//import { useDisplay } from 'vuetify'
//const display = useDisplay()

const cards = ref(
    [
        { title: 'Créditos de Manejo', text: 'This is card 1', description: 'Dados de créditos de manejo florestal', lastUpdate: '15/12/2024', interval: '2018 a 2024', image: 'menupic_1.webp', link: '/forest_management' },
        { title: 'GF-1', description: 'Dados emitidos de GF-1 para toras de madeira nativa', lastUpdate: '13/12/2024', interval: '2016 a 2024', image: 'menupic_2.webp', link: '/production' },
        { title: 'Resíduos', description: 'Dados da produção de resíduos', lastUpdate: '30/09/2023', image: 'menupic_4.webp', interval: '2018 a 2024', link: '/production' },
        { title: 'GF-3', description: 'Dados emitidos de GF-3 para produção e beneficiamento de madeiras', lastUpdate: '13/12/2024', interval: '2018 a 2024', image: 'menupic_3.webp', link: '/production' },
        { title: 'GF-3i', description: 'Dados de movimentação de madeira beneficiada para comercialização', lastUpdate: '30/09/2023', interval: '2018 a 2024', image: 'menupic_5.webp', link: '/production' },
        { title: 'Exportação Mato Grosso', description: 'Dados de exportação de madeira do Mato Grosso', lastUpdate: '130/11/2024', interval: '2018 a 2024', image: 'menupic_6.webp', link: '/production' },
        { title: 'Exportação Brasil', description: 'Dados de exportação de madeira em todo o Brasil', lastUpdate: '130/11/2024', interval: '2007 a 2017', image: 'menupic_7.webp', link: '/production' },
        { title: 'Importação Mundial', description: 'Dados de importação mundial', lastUpdate: '130/11/2024', interval: '2009 a 2020', image: 'menupic_8.webp', link: '/production' },
        { title: 'Tributação', description: 'Dados de tributação, taxas e impostos do setor de base florestal', lastUpdate: '130/11/2024', interval: '2020 a 2024', image: 'menupic_9.webp', link: '/production' },
    ]
);

</script>
<style scoped>
.hover-scale {
    transition: transform 0.2s ease-in-out;
}

.hover-scale:hover {
    transform: scale(1.03);
}

.no-wrap {
    white-space: nowrap;
}

.two-lines {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    line-height: 1.5em;
    min-height: 3em;
    /* Garante altura suficiente para 2 linhas */
}

.break-line {
    white-space: normal;
    /* Permite a quebra normal de linha */
    overflow-wrap: break-word;
    /* Quebra palavras muito longas */
    line-height: 1.1em !important;
}

.bg-title {
    background-color: rgba(255, 255, 255, 0.9);
    transition: background-color 0.3s ease;
    color: black;
    font-weight: bold;
}

.hover-scale:hover .bg-title {
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
}

.aldrich-regular {
    font-family: "Aldrich", sans-serif;
    font-weight: 400;
    font-style: normal;
}

.icon-left {
    min-width: 60px;
    max-width: 60px;
}

.text-medium-emphasis {
    line-height: 1.5rem;
}

.img {
    opacity: 0.7;
    filter: saturate(0.5);
    transition: filter 2s ease;
}

.hover-scale:hover .img {
    opacity: 1;
    filter: saturate(1);
}
.hover-scale:hover .info {
    color:#333!important;
}
</style>