import { router } from './router'
import { createVue } from './composables/useVue'
import { entrypoints } from 'uxp'

let called = false
entrypoints.setup({
  panels: {
    blockPanel: {
      create() {
        let el = document.getElementById('block-panel')
        const app = createVue('blockUpdate')
        app.mount(el)
      }
    },
    mainPanel: {
      create() {
          if ( called ) return
          try {
          let el = document.getElementById('main-panel')
          let app = createVue('main')
          app.use(router)
          app.mount(el)
          called = true
          } catch (e) {
            showAlert(e)
          }
      },
    },
  }
});


const showAlert = (txt) => {
  const dialog = app.dialogs.add();
  const col = dialog.dialogColumns.add();
  const colText = col.staticTexts.add();
  colText.staticLabel = "txt"

  dialog.canCancel = false;
  dialog.show();
  dialog.destroy();
  return;
}