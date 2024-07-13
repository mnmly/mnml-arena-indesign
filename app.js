const { entrypoints } = require("uxp");
const { app, Rectangle, ScriptLanguage } = require("indesign");
const { extractIDFromItem, getIDFromString, savePreferences, loadPreferences, extractBlockId } = require("./src/libs/utils");
const { importArena } = require("./src/libs/import-arena");
const { setupWebView } = require('./src/libs/setup-webview')

import { createApp } from "vue"
import index from './index.vue'
const vueApp = createApp(index);

entrypoints.setup({
  panels: {
    showPanel: {
        create() {
            console.log('create')
            vueApp.mount("#container")
        },
    //   show({node} = {}) {}
    },
    // authorisationPanel: {
    //   show({node} ={}) {}
    // }
  }
});
