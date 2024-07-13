import { createApp } from "vue";

import index from "../index.vue";
import auth from '../components/Auth/index.vue'
import blockUpdate from '../components/UpdateItem/index.vue'
import { createPinia } from 'pinia'
import { JSONPersistencePlugin } from './../stores/plugin'

export const createVue = (entrypoint) => {
  
  const route = {
    index,
    auth,
    blockUpdate,
  }

  const pinia = createPinia()
  pinia.use(JSONPersistencePlugin)
  const vueApp = createApp(route[entrypoint])
  vueApp.use(pinia)
  return vueApp
};
