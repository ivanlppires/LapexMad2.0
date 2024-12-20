<template >
    <v-system-bar theme="dark" window class="pa-0 topbar">
        <template v-if="!vuetify.display.lg.value && !vuetify.display.xl.value">
            <v-app-bar-nav-icon rounded="0" density="compact" @click="$emit('MenuDrawerActive')" />
            <span class="ml-2 mr-2" @click="$emit('MenuDrawerActive')">MENU</span>
        </template>
        <v-chip rounded="0" border>
            <v-icon class="mr-2">mdi-shield-search</v-icon>
            <span>SIBASEF - Sistema de Informação para o Setor de Base Florestal</span>
        </v-chip>
        <v-spacer />

        <UserButton />
        <v-chip pill link rounded="0" border>
            <v-avatar start rounded="0">
                <v-img :src="userImage"></v-img>
            </v-avatar>
            {{ store.user.name}}
        </v-chip>
    </v-system-bar>
</template>
<script setup lang="ts">
import UserButton from '@/components/UserButtom.vue';
import { createVuetify } from 'vuetify'
import { useAppStore} from "@/store/app";
import { computed } from 'vue';

const vuetify = createVuetify()
const store = useAppStore();

const userImage = computed(() => store.user.photoUrl ? store.user.photoUrl : 'https://cdn-icons-png.flaticon.com/512/63/63699.png');
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Saira+Condensed:wght@400&display=swap');

.topbar {
    font-family: 'Saira Condensed', sans-serif;
    text-transform: uppercase;
}
</style>
