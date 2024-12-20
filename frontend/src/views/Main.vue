<template>
  <v-app id="inspire">
    <menu-drawer v-model="drawer" :rail="rail" @logout="store.user.logout()" />
    <system-bar @MenuDrawerActive="MenuDrawerActive()" />
    <v-main class="bg-grey-lighten-3">
      <page-title :pageTitle="route.meta.title"/>
      <v-card class="mx-auto page-content page-home" elevation="0">
        <v-card-text class="full-height">
          <router-view />
        </v-card-text>
      </v-card>
    </v-main>
    <footer-bar />
  </v-app>
</template>

<script setup lang="ts">

import PageTitle from "@/components/PageTitle.vue";
import MenuDrawer from "@/components/layout/MenuDrawer.vue";
import SystemBar from "@/components/layout/SystemBar.vue";
import FooterBar from "@/components/layout/FooterBar.vue";

import { ref, watch, computed } from "vue";
import { createVuetify } from "vuetify";
import { useRoute } from "vue-router";
import { useAppStore} from "@/store/app";

const logged = ref(true);
const drawer = ref(true);
const rail = ref(true);
const vuetify = createVuetify();
const route = useRoute();
const store = useAppStore();

function MenuDrawerActive() {
  console.log('chamou');
  drawer.value = !drawer.value;
  // drawer.value = !drawer.value;
  rail.value = false;
}

// watch methods
const displayRail = watch(
  () => vuetify.display.name.value,
  (value) => {
    if (value === "lg" || value === "xl") rail.value = true;
  }
);

const scroll = watch(
  () => logged.value,
  (value) => {
    let body = document.querySelector("body");
    if (!value) {
      body?.style.setProperty("--scrollbar-display", "none");
    } else {
      body?.style.setProperty("--scrollbar-display", "auto");
    }
  }
);


</script>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  overflow-y: auto;
}
body::-webkit-scrollbar {
  /*display: var(--scrollbar-display, none);*/
}
.page-content {
  margin-bottom: 10px;
  max-width: 93vw;
  margin-top: -90px;
  min-height: calc(100vh - 100px - 100px);
}
.page-home{
  background-color: rgba(255,255,255,0.75);

}
.page-title{
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 1.5rem;
  font-weight: 500;
  color: #3c4858;
  text-align: center;
}
</style>
