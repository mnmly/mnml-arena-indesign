
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

async function getAssetFolder(doc) {

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
        jsonFile = await arenaAssetsFolder.getEntry(filename)
        fileFound = true
    } catch (e) {
    }
    if (!fileFound || !useCache) {
        jsonFile = await fetchAndSaveFile(url, arenaAssetsFolder, filename)
    }
    let data = JSON.parse(await jsonFile.read())
    return data
}

async function getArenaImage(id, accessToken, useCache) {
    var data = await getArenaData(id, accessToken, useCache)
    let url = data.image.original.url
    var imageFile = await fetchAndSaveFile(url, arenaAssetsFolder, data.id + data.image.filename, useCache)
    return imageFile
}

async function getArenaImageFromData(data) {
    let url = data.image.original.url
    var imageFile = await fetchAndSaveFile(url, arenaAssetsFolder, data.id + data.image.filename)
    return imageFile
}

module.exports = {
    importArena,
    getArenaData,
    getArenaImage,
    getArenaImageFromData,
    getAssetFolder
}