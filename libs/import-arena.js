
const { app, Rectangle, TextFrame } = require("indesign");
const { fetchAndSaveFile, loadPreferences } = require("./utils");
const fs = require('uxp').storage.localFileSystem;

// const path = require("path");

var keyShortcutMapping = {
    'c': 'content',
    'd': 'description',
    't': 'title'
};

let arenaAssetsFolder;

async function importArena(doc, item, id, refresh) {

    let docPath

    try {
        docPath = await doc.filePath;
    } catch (e) {
        throw new Error("Document has not been saved yet");
    }

    // Get the parent folder of the document
    let documentFolderURL = docPath.url.toString()
    let documentFolder

    const assetFolderName = 'arena-assets'

    try {
        documentFolder = await fs.getEntryWithUrl(documentFolderURL)

        let entries = await documentFolder.getEntries()
        arenaAssetsFolder = entries.find((d) => {
            return assetFolderName == d.name
        })
        if ( !arenaAssetsFolder ) {
            throw new Error('Asset folder not found')
        }
    } catch (error) {
        if (/Asset Folder/.test(error.message)) {
            arenaAssetsFolder = await documentFolder.createEntry(assetFolderName)
        } else {
            console.log(e)
            throw e
        }
    }
    await processPageItem(item, id, refresh)
}

async function getArenaData(id, force) {
    const pref = await loadPreferences(['accessToken'])
    var url = "https://api.are.na/v2/blocks/" + id + "?access_token=" + pref['accessToken']
    let filename = id + '.json'
    let fileFound = false
    let jsonFile
    try {
        jsonFile = await arenaAssetsFolder.getEntry(filename)
        fileFound = true
    } catch (e) {
    }
    if (!fileFound || force) {
        jsonFile = await fetchAndSaveFile(url, arenaAssetsFolder, filename)
    }
    let data = JSON.parse(await jsonFile.read())
    return data
}

async function getArenaImage(id, force) {
    var data = await getArenaData(id)
    let url = data.image.original.url
    var imageFile = await fetchAndSaveFile(url, arenaAssetsFolder, data.id + data.image.filename)
    return imageFile
}

async function processPageItem(item, id, force) {
    if (item instanceof Rectangle) {
        item.name = 'arena-' + id
        item.place(await getArenaImage(id, force))
    } else if (item instanceof TextFrame) {
        var data = await getArenaData(id, force)
        var keys = []
        for (var key in data) {
            keys.push(key);
        }
        keys.sort()
        var result = await createTextTypeDialog(keys, data)
        if (result && result.property) {
            requestedKeys = [result.property]
            var contents = []
            var keys = []
            for (var j = 0; j < requestedKeys.length; j++) {
                var key = requestedKeys[j];
                if (keyShortcutMapping[key]) {
                    key = keyShortcutMapping[key]
                }
                keys.push(key)
                contents.push(data[key].replace('&gt; ', ''))
            }
            item.name = 'arena.' + keys.join('+') + '-' + id
            item.contents = contents.join('\n')
        }
    }
}


function createTextTypeDialog(keys, data) {


    return new Promise((resolve, reject) => {
        let dialog = document.getElementById('dialog')
        let dropdown = document.getElementById('property-select')
        let preview = document.getElementById('property-select-preview')
        let closeButton = document.getElementById('dialog-cancel-button')
        
        const changeWindowSize = () => {
            let width = 400
            let height = dialog.offsetHeight
            dialog.resizeTo(width, height, 100, 100)
        }

        keys.forEach((k) => {
            let o = document.createElement('option')
            o.value = k
            o.textContent = k
            dropdown.appendChild(o)
        })

        dropdown.selectedIndex = keys.indexOf('title')
        preview.textContent = data['title']

        const onchange = (e) => {
            preview.textContent = data[e.target.value]
            setTimeout(changeWindowSize, 100)
        }

        const onclose = (e) => {
            dialog.close('cancelled');
        }

        dropdown.addEventListener('change', onchange)

        closeButton.addEventListener("click", onclose);

        dialog.showModal({title: "Are.na Block Import"}).then((r) => {
            dropdown.removeEventListener('change', onchange)
            closeButton.removeEventListener("click", onclose);
            if (r == "") {
                resolve({property: dropdown.value})
            } else {
                resolve(null)
            }
        }).catch((e) => {
            debugger
        })

        changeWindowSize()

    });
}

module.exports = {
    importArena
}