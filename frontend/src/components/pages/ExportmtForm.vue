<template>
    <v-expansion-panels v-model="expanded" :loading="fetchingData">
        <v-expansion-panel value="1">
            <v-expansion-panel-title color="teal-darken-3" class="text-uppercase">
                Consulta ao dados de Exportação MT
            </v-expansion-panel-title>
            <v-expansion-panel-text>
                <v-alert density="compact" variant="outlined" closable color="teal" class="mb-5">
                    Utilize os campos do formulário para
                    consultar os dados de Exportação MT. É possível consultar por múltiplos dados em um mesmo campo.
                </v-alert>
                <v-row dense>
                    <v-col cols="6">
                        <v-combobox variant="underlined" density="comfortable" v-model="select" :items="years" label="Ano" multiple chips clearable></v-combobox>
                    </v-col>
                    <v-col cols="6">
                        <v-combobox variant="underlined" density="comfortable" v-model="select" :items="product" label="Produto" multiple chips clearable></v-combobox>
                    </v-col>
                </v-row>
                <v-row dense class="bg-grey-lighten-4">
                    <v-col cols="4">
                        <v-combobox variant="underlined" density="comfortable" v-model="select" :items="source_ccsema" label="CC-Sema Remetente" multiple chips clearable></v-combobox>
                    </v-col>
                    <v-col cols="4">
                        <v-combobox variant="underlined" density="comfortable" v-model="select" :items="source_city" label="Município Remetente" multiple chips clearable></v-combobox>
                    </v-col>
                    <v-col cols="4">
                        <v-combobox variant="underlined" density="comfortable" v-model="select" :items="country" label="País" multiple chips clearable></v-combobox>
                    </v-col>
                </v-row>
                <v-row dense class="text-right">
                    <v-col cols="12">
                        <v-btn @click="expanded = []" color="teal-darken-3" variant="text" class="pl-5 pr-5  mr-2"
                            prepend-icon="mdi-cancel">Cancelar</v-btn>
                        <v-btn :loading="fetchingData" @click="getData()" color="" variant="text" class="pl-5 pr-5 "
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
const product = ref(["Madeira", "Lenha", "Carvão", "Outros"]);
const source_city = ref(["Matupá", "Juína", "Cuiabá", "Sinop"]);
const country = ref(["Argentina", "Bolívia", "Paraguai", "Uruguai"]);
const source_ccsema = ref(["1450", "2045", "2046", "2047"]);
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
    { title: "Espécie - Nome Popular", key: "specie_commom_name" },
    { title: "Espécie - Nome Científico", key: "specie_scientific_name" },
    { title: "Município Remetente", key: "source_city" },
    { title: "CC-Sema Destinatário", key: "destination_ccsema" },
    { title: "Metros Cúbicos", key: "cubic_meter" },
    { title: "Valor em R$", key: "amount" },
    { title: "Área Permitida", key: "area" },
    { title: "Área Realizada", key: "area_realized" },
    { title: "Crédito de área", key: "area_credit" }

]);
const items = ref([
    { year: 2020, specie_commom_name: 'Eucalipto', specie_scientific_name: 'Eucalyptus', source_city: 'Matupá', destination_ccsema: '1450', cubic_meter: 1000, amount: 1000, area: 1000, area_realized: 1000, area_credit: 1000 },
    { year: 2021, specie_commom_name: 'Itaúba', specie_scientific_name: 'Mezilaurus', source_city: 'Juína', destination_ccsema: '2045', cubic_meter: 1000, amount: 1000, area: 1000, area_realized: 1000, area_credit: 1000 },
    { year: 2022, specie_commom_name: 'Pinheiro', specie_scientific_name: 'Pinus', source_city: 'Cuiabá', destination_ccsema: '2046', cubic_meter: 1000, amount: 1000, area: 1000, area_realized: 1000, area_credit: 1000 },
    { year: 2023, specie_commom_name: 'Cedro', specie_scientific_name: 'Cedrus', source_city: 'Sinop', destination_ccsema: '2047', cubic_meter: 1000, amount: 1000, area: 1000, area_realized: 1000, area_credit: 1000 },
]);
</script>
<style>
.hvr:hover {
    background-color: aqua;
}
</style>
