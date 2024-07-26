
const fs = require('uxp').storage.localFileSystem;
const { fetchAndSaveFile, loadPreferences } = require("./utils");
const moment = require('moment')
const { app } = require('indesign')

let arenaAssetsFolder;

const updateItem = async (item, data, key, datetimeFormat) => {
    const datetimeKeys = ['updated_at', 'created_at']
    if(key == 'image') {
        item.name = `arena-${data.id}`
        try {
            item.place(await getArenaImageFromData(data))
        } catch (e) {
            console.log(e)
        }
    } else {
        item.name = `arena.${key}-${data.id}`
        if (datetimeKeys.indexOf(key) > -1) {
            item.contents = moment(data[key]).format(datetimeFormat || 'MMMM Do YYYY, h:mm:ss a')
        } else {
            item.contents = data[key];
        }
    }
}

async function getAssetFolder() {

    let doc = await app.activeDocument;
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

    return arenaAssetsFolder

}

async function importArena(doc, item, id, refresh, accessToken) {

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
    await processPageItem(item, id, accessToken, refresh)
}

async function getArenaData(id, accessToken, useCache) {
    var url = "https://api.are.na/v2/blocks/" + id + "?access_token=" + accessToken
    let filename = id + '.json'
    let fileFound = false
    let jsonFile
    try {
        jsonFile = await getAssetFolder().getEntry(filename)
        fileFound = true
    } catch (e) {
    }
    if (!fileFound || !useCache) {
        let folder = await getAssetFolder()
        jsonFile = await fetchAndSaveFile(url, folder, filename, useCache)
    }
    let data = JSON.parse(await jsonFile.read())
    return data
}

async function getArenaImage(id, accessToken, useCache) {
    var data = await getArenaData(id, accessToken, useCache)
    return getArenaImageFromData(data, useCache)
}

async function getArenaImageFromData(data, useCache) {
    let url = data.image.original.url
    let folder = await getAssetFolder()
    var imageFile = await fetchAndSaveFile(url, folder, data.id + data.image.filename, useCache)
    return imageFile
}

module.exports = {
    importArena,
    getArenaData,
    getArenaImage,
    getArenaImageFromData,
    getAssetFolder,
    updateItem
}