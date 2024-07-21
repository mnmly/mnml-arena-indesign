const os = require('os')
const fs = require('uxp').storage.localFileSystem
const { app, ScriptLanguage } = require("indesign")
const { shell }  = require("uxp");


const getIDFromString = (str) => {
    return parseInt(str.split('-').pop(), 10)
}

const extractIDFromItem = (linkStr) => {
    if( item.contentType == ContentType.GRAPHIC_TYPE && item.graphics.length > 0) {
        return parseInt(item.graphics[0].itemLink.name.replace(/\w{32}\.\w+$/, ''), 10)
    }
    return null
}

const openURL = async (url) => {
    try {
        await shell.openExternal(url, "Opening Are.na block page.")
    } catch ( e ) {
        console.error(e)
    }
}

const extractBlockId = (url) => {
    const match = url.match(/\/block\/(\d+)$/);
    return match ? match[1] : null;
}

async function savePreferences(pref) {
    const dataFolder = await fs.getDataFolder();
    const existingPrefs = await loadPreferences()
    const updatedPrefs = { ...existingPrefs, ...pref };
    const file = await dataFolder.createFile('mnml-arena.json', { overwrite: true });
    await file.write(JSON.stringify(updatedPrefs));
}

async function loadPreferences(property) {
    try {
        const dataFolder = await fs.getDataFolder()
        const file = await dataFolder.getEntry('mnml-arena.json')
        const contents = await file.read()
        const data = JSON.parse(contents)
        return property ? data[property] : data
    } catch (error) {
        console.log('No custom preferences file found or error reading it');
        return null;
    }
}

async function fetchAndSaveFile(url, folder, fileName, useCache) {

    try {
        if ( useCache ) {
            let entries = await folder.getEntries()
            let found = entries.find( ( d ) => {
                return fileName == d.name
            } )
            if ( found ) { return found }
        }
        const response = await fetch( url )
        if ( !response.ok ) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.arrayBuffer()
        const file = await folder.createFile( fileName, { overwrite: true } )
        await file.write( data )
        return file;
    } catch ( error ) {
        console.error("There was a problem fetching or saving the file:", error);
    }
}

const showAlert = (str) => {
    const dialog = app.dialogs.add();
    const col = dialog.dialogColumns.add();
    const colText = col.staticTexts.add();
    colText.staticLabel = str
    dialog.canCancel = false;
    dialog.show();
    dialog.destroy();
    return;
}

module.exports = {
    getIDFromString,
    extractIDFromItem,
    loadPreferences,
    savePreferences,
    fetchAndSaveFile,
    extractBlockId,
    openURL,
    showAlert
}