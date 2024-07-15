<template>
    <div ref='root' id="webview-container">
        <webview ref="webview" id="webview" width="100%" height="500px" src="https://arena.mnmly.com" uxpAllowInspector="true" ></webview>
    </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { useUserStore } from '../../stores/userStore';
import { storeToRefs } from 'pinia';
import Arena from 'are.na'

const root = ref(null)
const webview = ref(null)
const userStore = useUserStore()
const {accessToken, id} = storeToRefs(userStore)

Arena.prototype.me = function() {
    return {
        get: () => this._req('GET', 'me')
    }
}

const onresize = () => {
    webview.height = root.value.parentElement.clientHeight + 'px'
}

onMounted(() => {
    // Communication between plugin and web content
    webview.value.addEventListener('message', async (event) => {
        try {
            let data = JSON.parse(event.message)
            accessToken.value = data.accessToken
            let arena = new Arena({accessToken: data.accessToken})
            let user = await arena.me().get()
            id.value = user.id
            webview.src = "https://www.are.na"
        } catch (e){
            console.error(e)
        }
        console.log("Received message from WebView:", event.message);
    });
    window.addEventListener('resize', onresize)
})

onBeforeUnmount(() =>{
    window.removeEventListener('resize', onresize)
})

</script>