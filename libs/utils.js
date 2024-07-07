const fs = require('uxp').storage.localFileSystem;
const app = require('indesign').app;

const getIDFromString = (str) => {
    var id = parseInt(str.split('-').pop(), 10)
    // if( item.contentType == ContentType.GRAPHIC_TYPE && item.graphics.length > 0) {
    //     var idFromItem = parseInt(item.graphics[0].itemLink.name.replace(/\w{32}\.\w+$/, ''), 10)
    return id
}

const extractIDFromItem = (linkStr) => {
    if( item.contentType == ContentType.GRAPHIC_TYPE && item.graphics.length > 0) {
        return parseInt(item.graphics[0].itemLink.name.replace(/\w{32}\.\w+$/, ''), 10)
    }
    return null
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
        const dataFolder = await fs.getDataFolder();
        const file = await dataFolder.getEntry('mnml-arena.json');
        const contents = await file.read();
        const data = JSON.parse(contents);
        return property ? data[property] : data
    } catch (error) {
        console.log('No custom preferences file found or error reading it');
        return null;
    }
}

async function fetchAndSaveFile(url, folder, fileName) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.arrayBuffer();
        const file = await folder.createFile(fileName, { overwrite: true });
        await file.write(data);
        console.log(`File saved as ${fileName}`);
        return file;
    } catch (error) {
        console.error("There was a problem fetching or saving the file:", error);
    }
}

// Usage
module.exports = {
    getIDFromString,
    extractIDFromItem,
    loadPreferences,
    savePreferences,
    fetchAndSaveFile,
    extractBlockId
}