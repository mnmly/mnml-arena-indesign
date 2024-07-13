const { entrypoints } = require("uxp");
const { app, Rectangle, ScriptLanguage } = require("indesign");
const { extractIDFromItem, getIDFromString, savePreferences, loadPreferences, extractBlockId } = require("./src/libs/utils");
const { importArena } = require("./src/libs/import-arena");
const { setupWebView } = require('./src/libs/setup-webview')

entrypoints.setup({
  panels: {
    showPanel: {
      show({node} = {}) {}
    },
    authorisationPanel: {
      show({node} ={}) {}
    }
  }
});

function openURL(url) {
    var appleScript = 'tell application "System Events" to open location "' + url + '"';
    app.doScript(appleScript, ScriptLanguage.APPLESCRIPT_LANGUAGE);
}

document.getElementById('config-label').addEventListener('click', async (e) => {
  // console.log(e)
  e.target.parentElement.classList.toggle('visible')
  if (e.target.parentElement.classList.contains('visible')) {
    let val = await loadPreferences('accessToken')
   document.getElementById('config-access-token').value = val
  }
})

document.getElementById('save-config').addEventListener('click', async (e) => {
  await savePreferences({'accessToken': document.getElementById('config-access-token').value })
})

document.getElementById('open-url').addEventListener('click', async () => {
  const doc = await app.activeDocument;
  let item = doc.selectedPageItems[0]
  let id = getIDFromString(item.name)

  if( item instanceof Rectangle && item.graphics.length > 0) {
      let graphic = item.graphics.firstItem()
      let idFromItem = parseInt(graphic.itemLink.name.replace(/\w{32}\.\w+$/, ''), 10)
      if ( id != idFromItem ) {
          let confirmed = confirm("The image is chnaged from the original image put in the frame, do you want to go to the source of the image?")
          if ( confirmed ) {
              item.name = 'arena-' + idFromItem
              id = idFromItem
          }
      }
  }

  if ( id ) {
    openURL("https://are.na/block/" + id);
  }
});

const extractIDFromField = (e) => {
  if (/are\.na/.test(e.target.value)) {
    let id = extractBlockId(e.target.value)
    if (id) {
      e.target.value = id
    }
  }
}

document.getElementById('block-id').addEventListener('keyup', extractIDFromField)
document.getElementById('block-id').addEventListener('blur', extractIDFromField)
document.getElementById('import-arena').addEventListener('click', async () => {

  const doc = await app.activeDocument;
  let item = doc.selectedPageItems[0]
  let id = document.getElementById('block-id').value
  let useCache = document.getElementById('block-use-cache').checked
  await importArena(doc, item, id, !useCache)
})

function onSelectionChange(event) {
    const selection = event.target.selection;
    let id
    if (selection.length > 0) {
      id = getIDFromString(selection[0].name)
      if (!isNaN(id)) {
        document.getElementById('block-id').value = id
      } else {
        id = document.getElementById('block-id').value
      }
      document.getElementById('import-arena').textContent = 'Insert ' + ((selection[0] instanceof Rectangle) ? 'Image' : 'Text')
    }
    let container = document.querySelector('.are-na-actions')
    Array.from(container.querySelectorAll('.action-button')).forEach((button)=> {
      button.classList.toggle('visible', selection.length != 0 && id > 0)
    })
}

function setupSelectionChangeListener(doc) {
    if (doc) {
        doc.removeEventListener("afterSelectionChanged", onSelectionChange);
        doc.addEventListener("afterSelectionChanged", onSelectionChange);
    }
}

// Set up listener for the active document
function setupActiveDocumentListener() {
    const activeDocument = app.activeDocument;
    if (activeDocument) {
        setupSelectionChangeListener(activeDocument);
    } else {
        console.log("No active document");
    }
}

// Initial setup
setupActiveDocumentListener();