import { router } from './router'
import { createVue } from './composables/useVue'
import { entrypoints } from 'uxp'

entrypoints.setup({
  panels: {
    blockPanel: {
      create() {
        let el = document.getElementById('block-panel')
        this.app = createVue('blockUpdate').mount(el)
      }
    },
    mainPanel: {
      create() {
        let el = document.getElementById('main-panel')
        let app = createVue('main')
        app.use(router)
        app.mount(el)
      },
    },
  }
});
