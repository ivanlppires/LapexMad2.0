<template>
  <v-sheet class="ma-0 pa-0 mx-auto" width="400px" elevation="0">
    <v-sheet>
      <div class="text-subtitle-1 text-medium-emphasis text-left">
        Identificação
      </div>
      <v-text-field density="compact" placeholder="Endereço de email" prepend-inner-icon="mdi-email-outline"
                    variant="outlined" v-model="email"></v-text-field>
    </v-sheet>
    <v-sheet>
      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        <span>Senha</span><a class="text-caption text-decoration-none" href="#" rel="noopener noreferrer"
                             target="_blank">Esqueceu a senha?</a>
      </div>
      <v-text-field :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" :type="visible ? 'text' : 'password'"
                    density="compact" placeholder="Informe a sua senha" prepend-inner-icon="mdi-lock-outline"
                    variant="outlined"
                    @click:append-inner="visible = !visible" v-model="password"></v-text-field>
    </v-sheet>
    <v-sheet>
      <v-btn block class="text-subtitle-1 mb-5" color="teal-darken-4" size="large" variant="flat"
             @click="store.user.loginWithEmail(email, password)">Acessar
      </v-btn>
    </v-sheet>
    <v-sheet>
      <div class="subtitle2 ma-5">Ou autentique-se usando sua conta do<br> Google </div>
    </v-sheet>
    <v-sheet>
      <v-btn flat rounded="pill" class="bg-grey-lighten-3 mr-2 pr-4" @click="store.user.loginWithGoogle()">
        <img width="36" src="https://img.icons8.com/color/48/000000/google-logo.png" alt="google logo"/>
        Google
      </v-btn>
    </v-sheet>
    <v-sheet class="text-center bottom-fixed">
      <a class="text-teal-darken-1 text-decoration-none subtitle2" href="#" rel="noopener noreferrer" target="_blank">Não
        tem
        uma conta?
        <a href="#" @click="$emit('setTab', 'register')">Cadastre-se</a>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </a>
    </v-sheet>
  </v-sheet>
</template>
<script setup lang="ts">
import {ref} from "vue";
import {useAppStore} from "@/store/app";

const visible = ref(false);
const store = useAppStore();
const email = ref("andre@mail.com");
const password = ref("andre1@#$");
</script>

<style scoped>
.bottom-fixed {
  width: 500px;
  position: fixed;
  bottom: 10px;
  left: 0;
  right: 0;
  z-index: 99;
  margin: auto;
}
</style>
