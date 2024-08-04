import { router } from './router'
import { createVue } from './composables/useVue'
import { entrypoints } from 'uxp'
import { getIDFromString, openURL } from './libs/utils';
import { useBlockStore } from './stores/blockStore';
import { storeToRefs } from 'pinia';

let called = false
entrypoints.setup({
  panels: {
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
      }
    },
  },
  commands: {
    openBlockInArena: async () => {
      const {targetItem} = storeToRefs( useBlockStore() )
      if ( targetItem.value ) {
        let id = getIDFromString(targetItem.value.name)
        if ( !isNaN(id) ) {
          await openURL('https://www.are.na/block/' + id)
        }
      }
    }
  },
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