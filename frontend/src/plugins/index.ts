/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import { loadFonts } from './webfontloader'
import firebase from "@/plugins/firebase";
import pinia from '../store'
import vuetify from './vuetify'
import router from '../router'

// Types
import type { App } from 'vue'

export function registerPlugins (app: App) {
  loadFonts()
  firebase; // firebase is imported for side effects only
  app
    .use(pinia)
    .use(vuetify)
    .use(router)
}
