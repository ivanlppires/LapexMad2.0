<template lang="">
  <v-menu open-on-hover>
    <template v-slot:activator="{ props }">
      <v-chip pill :rounded="0" link border v-bind="props">
        <v-avatar class="mr-2" density="compact">
          <v-img src="https://cdn.vuetifyjs.com/images/flags/br.png" />
        </v-avatar>
        <span>PORTUGUÊS</span>
      </v-chip>
    </template>
    <v-list theme="light" class="topbar" style="font-size:0.85rem">
      <v-list-item density="compact" pill v-for="(item, index) in languages" :key="index" to="/">
        <v-avatar class="mr-2" style="width:1rem">
          <v-img :src="item.icon" />
        </v-avatar>
        <span>{{ item.title}}</span>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<script setup lang="ts">
import { ref } from "vue";

const languages = ref([
  {
    title: "Português (BR)",
    icon: "https://cdn.vuetifyjs.com/images/flags/br.png",
  },
  { title: "English", link: '#', icon: "https://cdn.vuetifyjs.com/images/flags/us.png" },
]);
</script>
<style lang=""></style>
