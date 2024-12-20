<template>
    <v-tabs v-model="tab" color="teal-accent-4" align-tabs="start">
        <v-tab value="gf1">GF-1</v-tab>
        <v-tab value="gf3">GF-3 Mato Grosso</v-tab>
        <v-tab value="residual">Resíduos</v-tab>
        <v-spacer />
        <v-tab value="help"> <v-icon>mdi-comment-question-outline</v-icon></v-tab>
    </v-tabs>
    <v-window v-model="tab" class="mt-2">
        <v-window-item value="gf1"> <gf1-form /> </v-window-item>
        <v-window-item value="gf3"> <gf3-form /> </v-window-item>
        <v-window-item value="residual"> <residual-form /> </v-window-item>
    </v-window>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import Gf1Form from '@/components/pages/Gf1Form.vue';
import Gf3Form from '@/components/pages/Gf3Form.vue';
import ResidualForm from '@/components/pages/ResidualForm.vue';

const tab = ref(1);
</script>