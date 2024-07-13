import { entrypoints } from 'uxp'
import { createVue } from './composables/useVue'

entrypoints.setup({
  panels: {
    mainPanel: {
      create() {
        console.log('create')
        let el = document.getElementById('main-panel')
        createVue('blockUpdate').mount(el)
      },
    },
    authorisationPanel: {
      create() {
        createVue('auth').mount('#authorisation-panel')
      }
    }
  }
});
