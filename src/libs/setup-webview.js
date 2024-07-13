const uxp = require('uxp');
const { savePreferences } = require('./utils');

document.addEventListener('DOMContentLoaded', async () => {

    const reloadButton = document.getElementById('reload-button');
    const webview = document.getElementById('webview')

    webview.addEventListener("loadstart", (e) => {
        console.log(`webview.loadstart ${e.url}`);
      });

    // Communication between plugin and web content
    webview.addEventListener('message', async (event) => {
        try {
            let data = JSON.parse(event.message)
            await savePreferences({'accessToken': data.accessToken})
            webview.src = "https://www.are.na"
            // p.textContent = 'Access Token is saved successfully.'
        } catch (e){
            console.error(e)
        }
        console.log("Received message from WebView:", event.message);
    });

    window.addEventListener('resize', () => {
        webview.height = document.getElementById('authorisation-panel').clientHeight + 'px'
    })
});