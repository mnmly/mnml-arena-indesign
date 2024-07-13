<template>
    <div ref='root' id="webview-container">
        <webview ref="webview" id="webview" width="100%" height="500px" src="https://arena.mnmly.com" uxpAllowInspector="true" ></webview>
    </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { useUserStore } from '../../stores/userStore';
import { storeToRefs } from 'pinia';

const root = ref(null)
const webview = ref(null)
const userStore = useUserStore()
const {accessToken} = storeToRefs(userStore)

const onresize = () => {
    webview.height = root.value.parentElement.clientHeight + 'px'
}

onMounted(() => {
    // Communication between plugin and web content
    webview.value.addEventListener('message', async (event) => {
        try {
            console.log(userStore)
            let data = JSON.parse(event.message)
            accessToken.value = data.accessToken
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