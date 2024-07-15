import { entrypoints } from 'uxp'
import { createVue } from './composables/useVue'
import { router } from './router';

entrypoints.setup({
  panels: {
    mainPanel: {
      create() {
        let el = document.getElementById('main-panel')
        this.app = createVue('blockUpdate').mount(el)
      }
    },
    userPanel: {
      create() {
        let el = document.getElementById('user-panel')
        let app = createVue('user')
        app.use(router)
        app.mount(el)
      },
    },
    authorisationPanel: {
      create() {
        createVue('auth').mount('#authorisation-panel')
      }
    }
  }
});
