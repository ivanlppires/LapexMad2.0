<template>
  <v-navigation-drawer theme="dark" color="grey-darken-4" elevation="5" expand-on-hover>
    <v-img src="@/assets/lapexmad_horizontal2.png" style="min-width: 256px;" class="bg-grey-darken-3" aspect-ratio="1/1" />
    <v-divider></v-divider>
    <v-list density="compact" nav color="teal-accent-3">
      <v-list-item prepend-icon="mdi-home" title="Início" value="Home" to="/home" />
      <v-divider />
      <v-list-item v-for="item in menuList1" :class="(item.color) ? 'text-' + item.color + '-accent-2' : ''"
        :prepend-icon="item.icon" :title="item.title" :value="item.value" :key="item.value" :to="item.value"></v-list-item>
      <v-divider></v-divider>
      <v-list-item v-for="item in menuList2" :prepend-icon="item.icon" :title="item.title" :value="item.value" :key="item.value" :to="item.value"></v-list-item>
    </v-list>
    <v-divider></v-divider>
    <template v-slot:append>
      <v-list density="compact" nav color="deep-orange-darken-3">
        <v-list-item prepend-icon="mdi-logout" title="Desconectar-se" value="logout" @click="$emit('logout')" />
      </v-list>
    </template>
  </v-navigation-drawer>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const menuList1 = ref([
  { title: 'Manejo Florestal', icon: 'mdi-card-search', color: 'yellow', value: 'forest_management' },
  { title: 'Produção', icon: 'mdi-card-search', color: 'cyan', value: 'production' },
  { title: 'Movimentação', icon: 'mdi-card-search', color: 'orange', value: 'movement' },
  { title: 'Exportação/Importação', icon: 'mdi-card-search', color: 'green', value: 'export_import' },
]);

const menuList2 = ref([
  { title: 'Origem dos Dados', icon: 'mdi-chart-timeline-variant-shimmer', value: 'source' },
  { title: 'Atualização', icon: 'mdi-refresh-circle', value: 'version' },
  { title: 'Base Legal', icon: 'mdi-scale-balance', value: 'legal' },
  { title: 'LGPD', icon: 'mdi-shield-check', value: 'lgpd' },
  { title: 'P&D', icon: 'mdi-school', value: 'ped' },
  { title: 'Perguntas Frequentes', icon: 'mdi-frequently-asked-questions', value: 'faq' },
]);



</script>
