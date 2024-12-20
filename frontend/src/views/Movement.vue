<template>
    <v-expansion-panels v-model="expanded" :loading="fetchingData">
        <v-expansion-panel value="1">
            <v-expansion-panel-title color="teal-darken-3" class="text-uppercase">
                Consulta ao dados de Movimentação GF3-i
            </v-expansion-panel-title>
            <v-expansion-panel-text>
                <v-alert density="compact" variant="outlined" closable color="teal" class="mb-5">
                    Utilize os campos do formulário para
                    consultar os dados de movimentação GF3-i (para outros estados). É possível consultar por múltiplos dados
                    em um mesmo campo.
                </v-alert>
                <v-row dense>
                    <v-col cols="6">
                        <v-combobox variant="underlined" density="comfortable" v-model="select" :items="years" label="Ano"
                            multiple chips clearable></v-combobox>
                    </v-col>
                    <v-col cols="6">
                        <v-combobox variant="underlined" density="comfortable" v-model="select" :items="produto"
                            label="Produto" multiple chips clearable></v-combobox>
                    </v-col>
                </v-row>
                <v-row dense class="bg-grey-lighten-4">
                    <v-col cols="4">
                        <v-combobox variant="underlined" density="comfortable" v-model="select" :items="source_city"
                            label="Município Remetente" multiple chips clearable></v-combobox>
                    </v-col>
                    <v-col cols="4">
                        <v-combobox variant="underlined" density="comfortable" v-model="select" :items="destination_state"
                            label="Estado Destinatário" multiple chips clearable></v-combobox>
                    </v-col>
                    <v-col cols="4">
                        <v-combobox variant="underlined" density="comfortable" v-model="select" :items="source_ccsema"
                            label="CC-Sema Remetente" multiple chips clearable></v-combobox>
                    </v-col>
                </v-row>
                <v-row dense class="text-right">
                    <v-col cols="12">
                        <v-btn @click="expanded = []" color="teal-darken-3" variant="text" class="pl-5 pr-5  mr-2"
                            prepend-icon="mdi-cancel">Cancelar</v-btn>
                        <v-btn :loading="fetchingData" @click="getData()" color="   " variant="text" class="pl-5 pr-5 "
                            prepend-icon="mdi-magnify">Consultar</v-btn>
                    </v-col>
                </v-row>
            </v-expansion-panel-text>
        </v-expansion-panel>
    </v-expansion-panels>
    <v-card :loading="fetchingData" elevation="0" class="ma-0 pa-0">&nbsp;</v-card>
    <data-table :headers="headers" :items="items" v-if="result" />
</template>
<script setup lang="ts">
import { ref } from "vue";
import DataTable from "@/components/result/DataTable.vue";

/* FORM FIELDS */
const select = ref([]);
const expanded = ref(['1']);
const fetchingData = ref(false);
const result = ref(false);
const arrayRange = (start: number, stop: number, step: number) =>
    Array.from(
        { length: (stop - start) / step + 1 },
        (value, index) => start + index * step
    );
const years = arrayRange(2000, 2023, 1);
const produto = ref([
    "Tora",
    "Deck"
]);
const source_city = ref([
    "Sinop",
    "Marcelândia"
]);
const destination_state = ref([
    "MS",
    "PR"
]);
const source_ccsema = ref([
    "14254",
    "23798"
]);
const getData = () => {
    fetchingData.value = true;
    setTimeout(() => {
        fetchingData.value = false;
        result.value = true;
        expanded.value = [];
    }, 2000);
};

/* DATA TABLE */
const headers = ref([
    {
        align: 'start',
        key: 'year',
        title: 'Ano',
    },
    { title: "Produto", key: "product" },
    { title: "Município Remetente", key: "source_city" },
    { title: "Estado Destinatário", key: "destination_state" },
    { title: "CC-Sema Remetente", key: "source_ccsema" },
    { title: "Metros Cúbicos", key: "cubic_meter" },
    { title: "Valor R$", key: "amount" },


]);
const items = ref([
    {
        year: 2021,
        product: "Tora",
        source_city: "Sinop",
        destination_state: "MS",
        source_ccsema: "14254",
        cubic_meter: 1000,
        amount: 100000
    },
    {
        year: 2021,
        product: "Deck",
        source_city: "Marcelândia",
        destination_state: "PR",
        source_ccsema: "23798",
        cubic_meter: 2000,
        amount: 200000
    },
]);
</script>