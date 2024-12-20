<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-card elevation="0" class="mt-0 pa-0">
    <v-card-title>RESULTADO DA PESQUISA</v-card-title>
    <v-card-text>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Digite para filtrar os resultados"
        color="teal"
        single-line
        hide-details
        density="compact"
        variant="outlined"
      ></v-text-field>
      <v-data-table
        hide-actions
        :headers="headers"
        :items="items"
        :search="search"
        class="elevation-0 pa-3 ma-0"
      >
        <!-- <template
            v-for="header in headers.filter((header: any) => header.hasOwnProperty('formatter'))"
            :key="header.key"
            v-slot:[`item.${header.key}`]="{ header, key }"
          >
            {{ header.formatter(key) }}
        </template> -->
        <template v-slot:item.emission="{ item }">
          <!-- <span>{{ item.value.emission }}</span> -->
          <span>{{ new Date(item.value.emission).getFullYear() }}</span>
        </template>
        <template v-slot:tbody>
          <tr class="bg-teal-darken-3 text-left" >
            <th class="pa-3 text-uppercase" colspan="5">Total</th>
            <th class="pa-3">{{ sumField('cubic_meter') }}</th>
            <th class="pa-3"> {{ sumField('amount') }}</th>
            <th class="pa-3"> {{ sumField('area') }}</th>
            <th class="pa-3"> {{ sumField('area_realized') }}</th>
            <th class="pa-3"> {{ sumField('area_credit') }}</th>
          </tr>
        </template>
        <!-- <template v-slot:footer.prepend>
            <v-btn color="teal" class="mt-5" prepend-icon="mdi-file-pdf-box" variant="outlined">Download em PDF</v-btn>
            <v-spacer />
        </template> -->
      </v-data-table>
    </v-card-text>
  </v-card>
</template>
<script setup lang="ts">
import { ref } from "vue";
const search = ref('');

// props in ts
const props = defineProps({
    headers: {
        type: Array,
        required: true
    },
    items: {
        type: Array,
        required: true
    }
});

// sum field
const sumField = (field: string) => {
    return props.items.reduce((acc: number, item: any) => acc + item[field], 0);
};

</script>
<style lang="">

</style>
