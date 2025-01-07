<template>
  <v-expansion-panels v-model="expanded" :loading="fetchingData">
    <v-expansion-panel value="1">
      <v-expansion-panel-title color="teal-darken-3" class="text-uppercase">
        Consulta ao dados do Manejo Florestal
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-alert density="compact" variant="outlined" closable color="teal" class="mb-5">
          Utilize os campos do formulário para
          consultar os dados do Manejo florestal. É possível consultar por múltiplos dados em um mesmo campo.
        </v-alert>
        <v-row dense>
          <v-col cols="4">
            <v-combobox variant="underlined" density="comfortable" v-model="selectedYears" search-input :items="years"
              label="Ano" multiple chips closable-chips clearable @update:model-value="validateYear"></v-combobox>
          </v-col>
          <v-col cols="4">
            <v-autocomplete v-model="speciesCommonName" :items="sourceSpeciesCommonName"
              :loading="searchSpeciesCommonNameLoading" v-model:search="searchSpeciesCommonName" hide-selected
              :item-title="item => item.name" item-text="name" item-value="uuid" label="Espécie - Nome Popular"
              placeholder="Dígite o nome popular da espécie" no-data-text="Nenhum nome popular encontrado" return-object
              chips closable-chips clearable multiple variant="underlined" density="comfortable"></v-autocomplete>
          </v-col>

          <v-col cols="4">
            <v-autocomplete v-model="speciesScientificName" :items="sourceSpeciesScientificName"
              :loading="searchSpeciesScientificNameLoading" v-model:search="searchSpeciesScientificName" hide-selected
              :item-title="item => item.name" item-text="name" item-value="uuid" label="Espécie - Nome Científico"
              placeholder="Dígite o nome científico da espécie" no-data-text="Nenhum nome científico encontrado"
              return-object chips closable-chips clearable multiple variant="underlined"
              density="comfortable"></v-autocomplete>
          </v-col>
        </v-row>
        <v-row dense class="bg-grey-lighten-4">
          <v-col cols="6">
            <v-autocomplete v-model="cities" :items="sourceCities" :loading="searchCityLoading"
              v-model:search="searchCity" hide-selected :item-title="item => item.name + ' - ' + item.city_state.abbr"
              item-text="name" item-value="uuid" label="Município Remetente" placeholder="Dígite o nome do município"
              no-data-text="Nenhum município encontrado" return-object chips closable-chips clearable multiple
              variant="underlined" density="comfortable"></v-autocomplete>
          </v-col>

          <v-col cols="6">
            <v-combobox variant="underlined" density="comfortable" v-model="destination_ccsema"
              label="CC-Sema Destinatário" multiple chips small-chips closable-chips clearable :allow-overflow="false"
              hide-selected :hide-no-data="false">
              <template v-slot:no-data>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>
                      Pressione <kbd>enter</kbd> para adicionar
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>
              <!-- <template v-slot:selection="{ attrs, item, select, selected }">
                            <v-chip
                              small
                              v-bind="attrs"
                              :input-value="selected"
                              close
                              closable
                              close-icon="mdi-close-circle-outline"
                              @click="select"
                              >
                              {{ item }}
                            </v-chip>
                          </template> -->
            </v-combobox>
          </v-col>
        </v-row>

        <v-row dense class="d-flex justify-space-between mt-5">
          <v-btn @click="expanded = []" color="teal-darken-3" variant="text" class="pl-5 pr-5  mr-2"
            prepend-icon="mdi-cancel">
            Cancelar
          </v-btn>
          <v-btn :loading="fetchingData" @click="getData()" color="teal-darken-3" variant="tonal" class="pl-5 pr-5 "
            prepend-icon="mdi-magnify">
            Consultar
          </v-btn>
        </v-row>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
  <v-btn class="ma-4" color="primary" @click="testePerfil">Teste - Perfil</v-btn>
  <v-card :loading="fetchingData" elevation="0" class="ma-0 pa-0">&nbsp;</v-card>
  <data-table :headers="headers" :items="items" v-if="result" />
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import DataTable from "@/components/result/DataTable.vue";
import { reactive } from "vue";
import { useDebounceFn } from "@vueuse/core";
import { api } from "@/utils/api";
import { post } from "@/utils/conexaoApi";
import { onBeforeMount } from "vue";
import axios from "axios";
import { format } from "path";


const LIMIT = 10;
const LIMIT_MAX = 999999999;
/* FORM FIELDS */
const expanded = ref(['1']);
const fetchingData = ref(false);
const result = ref(false);
const arrayRange = (start: number, stop: number, step: number) =>
  Array.from(
    { length: (stop - start) / step + 1 },
    (value, index) => start + index * step
  );
const selectedYears = ref([]);
const years = arrayRange(2000, new Date().getFullYear(), 1);
const sourceSpeciesCommonName = ref([]);
const searchSpeciesCommonName = ref("");
const searchSpeciesCommonNameLoading = ref(false);
const speciesCommonName = ref([]);

const sourceSpeciesScientificName = ref([]);
const searchSpeciesScientificName = ref("");
const searchSpeciesScientificNameLoading = ref(false);
const speciesScientificName = ref([]);

const sourceCities = ref([]);
const searchCity = ref("");
const searchCityLoading = ref(false);
const cities = ref([]);

const destination_ccsema = ref([]);

const validateYear = (values: any) => {
  console.log(values);
  values.forEach((value: any) => {
    const valueIndex = years.indexOf(Number.parseInt(value));
    if (valueIndex === -1) {
      values.splice(values.indexOf(value), 1);
    }
  });
}

/* DATA TABLE */
const headers = ref([
  { align: 'start', key: 'emission', title: 'Ano', formatter: formatDateYear },
  { title: "Espécie - Nome Popular", key: "forestry_guide_specie.specie_common_name.name" },
  { title: "Espécie - Nome Científico", key: "forestry_guide_specie.specie_scientific_name.name" },
  { title: "Município Remetente", key: "forestry_guide_sender.enterprise_city.name" },
  { title: "CC-Sema Destinatário", key: "forestry_guide_recipient.ccsema" },
  { title: "Metros Cúbicos", key: "volume" },
  { title: "Valor em R$", key: "value_total" },
  { title: "Área Permitida", key: "area" },
  { title: "Área Realizada", key: "area_realized" },
  { title: "Crédito de área", key: "area_credit" }

]);

function formatDateYear(value: any) {
  console.log(value);
  return value ? new Date(value).getFullYear() : '';
}

const items = ref([
  { year: 2020, specie_commom_name: 'Eucalipto', specie_scientific_name: 'Eucalyptus', source_city: 'Matupá', destination_ccsema: '1450', cubic_meter: 1000, amount: 1000, area: 1000, area_realized: 1000, area_credit: 1000 },]);

watch(searchCity, useDebounceFn(async (value) => {
  if (value?.length > 2) {
    searchCityLoading.value = true;
    await api.post('/city/search', { name: value, limit: LIMIT })
      .then((response) => {
        sourceCities.value = response.data?.cities;
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        searchCityLoading.value = false;
      });
  }
}, 500));

watch(searchSpeciesCommonName, useDebounceFn(async (value) => {
  if (value?.length > 2) {
    searchSpeciesCommonNameLoading.value = true;
    await api.post('/specie-common-name/search', { name: value, limit: LIMIT })
      .then((response) => {
        console.log(response);
        sourceSpeciesCommonName.value = response.data?.speciesCommonNames;
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        searchSpeciesCommonNameLoading.value = false;
      });
  }
}, 500));

watch(searchSpeciesScientificName, useDebounceFn(async (value) => {
  if (value?.length > 2) {
    searchSpeciesScientificNameLoading.value = true;
    await api.post('/specie-scientific-name/search', { name: value, limit: LIMIT })
      .then((response) => {
        console.log(response);
        sourceSpeciesScientificName.value = response.data?.speciesScientificNames;
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        searchSpeciesScientificNameLoading.value = false;
      });
  }
}, 500));

const getData = () => {
  fetchingData.value = true;
  const searchFilters = {
    years: selectedYears.value,
    speciesCommonName: speciesCommonName.value,
    speciesScientificName: speciesScientificName.value,
    sendersCities: cities.value.map((city: any) => city.uuid),
    sendersCcSema: destination_ccsema.value,
    limit: LIMIT_MAX,
  };

  console.log(searchFilters);
  // fetchingData.value = true;
  // setTimeout(() => {
  //     fetchingData.value = false;
  //     result.value = true;
  //     expanded.value = [];
  // }, 2000);
  api.post('/forestry-guide/manejo/search', searchFilters)
    .then((response: any) => {
      console.log(response);
      result.value = true;
      expanded.value = [];
      items.value = response.data.forestryGuide;
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      fetchingData.value = false;
    });
};
const testePerfil = () => {
  api.get('/gf1/basic', {
    params: {
      anos: [2023, 2024],
      especies: [9105, 3340],
    },
  })
    .then((response: any) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};
</script>
<style>
.hvr:hover {
  background-color: aqua;
}
</style>
