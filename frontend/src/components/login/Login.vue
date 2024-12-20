<template>
    <v-app full-height style="max-height: 100vh">
        <v-parallax src="../../assets/bg-tree-trunk.jpeg">
            <div class="full-center">
                <v-container class="pa-0 bg-white text-center" style="width: 550px; height:100vh;">
                    <top/>
                    <v-container class="ma-0 pa-0">
                        <v-tabs v-model="tab" fixed-tabs theme="dark" color="amber-lighten-1" bg-color="teal-darken-4">
                            <v-tab value="login"> Autenticar </v-tab>
                            <v-tab value="register"> Cadastrar </v-tab>
                            <v-tab value="info"> Informações </v-tab>
                        </v-tabs>
                        <v-window v-model="tab" class="pa-4 ma-0 content-login">
                            <v-window-item value="login"><auth-form @auth="$emit('auth')" /></v-window-item>
                            <v-window-item value="register"><register /></v-window-item>
                            <v-window-item value="info"> 
                                <info @setTab="setTab" />
                            </v-window-item>
                        </v-window>
                    </v-container>
                </v-container>
            </div>
        </v-parallax>
    </v-app>
</template>
<script setup lang="ts">
import { ref } from "vue";

import Top from './Top.vue';
import AuthForm from './AuthForm.vue';
import Register from './Register.vue';
import Info from './Info.vue';

const tab = ref("login");

function setTab(t: string) {
    tab.value = t;
}

</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Changa+One:ital@0;1&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Oswald&display=swap");

* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
.login {
    background-color: rgba(255, 255, 255);
    font-weight: bold;
    text-align: center;
    padding: 1rem;
    height: 100vh;
    z-index: 99;
}

.title {
    background-color: #23180dcc;
}

.title>span {
    text-shadow: 2px 2px 4px #000000;
    font-size: 2.5rem;
    font-family: "Changa One", cursive;
    text-transform: uppercase;
}

.subtitle {
    font-family: "Oswald", sans-serif;
    text-transform: uppercase;
    font-size: 0.8rem;
}

.subtitle2 {
    text-transform: uppercase;
    font-size: 0.7rem;
    text-align: center;
    color: #666;
    margin: 1vh;
}

.full-center {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
}

content-login a,
content-login a:link,
content-login a:visited {
    color: #009900;
    text-decoration: none;
}

content-login a:hover {
    color: #00cc00;
    text-decoration: underline;
}
</style>
  