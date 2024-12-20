<template>
    <v-tabs v-model="tab" color="teal-accent-4" align-tabs="start">
        <v-tab value="export_mt">Exportação Mato Grosso</v-tab>
        <v-tab value="export_br">Exportação Brasil</v-tab>
        <v-tab value="import">Importação Mundial</v-tab>
    </v-tabs>
    <v-window v-model="tab" class="mt-2">
        <v-window-item value="export_mt"> <exportmt-form /> </v-window-item>
        <v-window-item value="export_br"> <exportbr-form /> </v-window-item>
        <v-window-item value="import"> <import-form /> </v-window-item>
    </v-window>
</template>
<script setup lang="ts">

import { ref } from 'vue';

import ExportmtForm from '@/components/pages/ExportmtForm.vue'
import ExportbrForm from '@/components/pages/ExportbrForm.vue'
import ImportForm from '@/components/pages/ImportForm.vue'

const tab = ref('export_mt');
</script>