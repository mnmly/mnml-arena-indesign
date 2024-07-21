import { createApp } from "vue";

import index from "../index.vue";
import main from "../components/Main/index.vue";
import auth from '../components/Auth/index.vue'
import app from '../components/App/index.vue'
import blockUpdate from '../components/UpdateItem/index.vue'
import { createPinia } from 'pinia'
import { JSONPersistencePlugin } from './../stores/plugin'

const pinia = createPinia()
pinia.use(JSONPersistencePlugin)

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
