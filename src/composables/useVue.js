import { createApp } from "vue";

import index from "../index.vue";
import main from "../components/Main.vue";
import auth from '../components/Auth.vue'
import app from '../components/App.vue'
import blockUpdate from '../components/UpdateItem.vue'
import { createPinia } from 'pinia'
import { JSONPersistencePlugin, LocalStoragePlugin } from './../stores/plugin'

const pinia = createPinia()
pinia.use(JSONPersistencePlugin)
pinia.use(LocalStoragePlugin)

export const createVue = (entrypoint) => {
  
  const route = {
    app,
    index,
    auth,
    main,
    blockUpdate,
  }

  const vueApp = createApp(route[entrypoint])
  vueApp.use(pinia)
  return vueApp
};
