import { router } from './router'
import { entrypoints } from 'uxp'
import { getIDFromString, openURL } from './libs/utils';
import { useBlockStore } from './stores/blockStore';
import { createPinia, storeToRefs } from 'pinia';
import { createApp } from 'vue';
import Main from './components/Main.vue';
import { JSONPersistencePlugin, LocalStoragePlugin } from './stores/plugin';

const pinia = createPinia()
pinia.use(JSONPersistencePlugin)
pinia.use(LocalStoragePlugin)

entrypoints.setup({
  panels: {
    mainPanel: {
      create() {
          let el = document.getElementById('main-panel')
          const app = createApp(Main)
          app.use(pinia)
          app.use(router)
          app.mount(el)
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
        } else {
          alert('Selected item is not linked to are.na block.')
        }
      } else {
        alert('No item is selected.')
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