<template>
    <div ref='root' id="user-container">
        <nav v-if="accessToken" id="main-nav" class="app-width">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150.38 88.986"><path d="M148.93 62.356l-20.847-16.384c-1.276-1-1.276-2.642 0-3.645l20.848-16.38c1.28-1.002 1.815-2.695 1.19-3.76-.626-1.062-2.374-1.44-3.88-.84l-24.79 9.874c-1.507.606-2.927-.22-3.153-1.83L114.57 2.926C114.34 1.317 113.13 0 111.877 0c-1.247 0-2.456 1.317-2.68 2.925l-3.73 26.467c-.228 1.61-1.646 2.434-3.155 1.83l-24.38-9.71c-1.512-.602-3.975-.602-5.483 0l-24.384 9.71c-1.508.604-2.928-.22-3.154-1.83L41.186 2.925C40.956 1.317 39.748 0 38.5 0c-1.252 0-2.463 1.317-2.688 2.925l-3.73 26.467c-.226 1.61-1.645 2.434-3.153 1.83L4.14 21.35c-1.507-.603-3.252-.223-3.878.838-.625 1.066-.092 2.76 1.184 3.76l20.85 16.38c1.277 1.003 1.277 2.645 0 3.646L1.446 62.356C.166 63.358-.364 65.152.26 66.34c.627 1.19 2.372 1.668 3.877 1.064l24.567-9.866c1.51-.603 2.914.218 3.125 1.828l3.544 26.696c.214 1.607 1.618 2.923 3.12 2.923 1.5 0 2.905-1.315 3.12-2.923l3.55-26.696c.21-1.61 1.62-2.43 3.122-1.828l24.164 9.698c1.506.606 3.97.606 5.477 0l24.16-9.698c1.504-.603 2.91.218 3.125 1.828l3.55 26.696c.212 1.607 1.617 2.923 3.115 2.923 1.502 0 2.907-1.315 3.12-2.923l3.55-26.696c.216-1.61 1.62-2.43 3.124-1.828l24.57 9.866c1.5.604 3.25.125 3.876-1.063.627-1.186.094-2.98-1.185-3.982zM95.89 46.18L77.53 60.315c-1.285.99-3.393.99-4.674 0L54.49 46.18c-1.284-.99-1.294-2.62-.02-3.625l18.4-14.493c1.274-1.005 3.363-1.005 4.638 0l18.4 14.493c1.277 1.004 1.267 2.634-.02 3.626z"></path></svg>
        <a @click.prevent="logout">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.95 1.50005C12.95 1.25152 12.7485 1.05005 12.5 1.05005C12.2514 1.05005 12.05 1.25152 12.05 1.50005L12.05 13.5C12.05 13.7486 12.2514 13.95 12.5 13.95C12.7485 13.95 12.95 13.7486 12.95 13.5L12.95 1.50005ZM6.5683 3.93188C6.39257 3.75614 6.10764 3.75614 5.93191 3.93188C5.75617 4.10761 5.75617 4.39254 5.93191 4.56827L8.41371 7.05007L0.499984 7.05007C0.251456 7.05007 0.0499847 7.25155 0.0499847 7.50007C0.0499846 7.7486 0.251457 7.95007 0.499984 7.95007L8.41371 7.95007L5.93191 10.4319C5.75617 10.6076 5.75617 10.8925 5.93191 11.0683C6.10764 11.244 6.39257 11.244 6.56831 11.0683L9.8183 7.81827C9.99404 7.64254 9.99404 7.35761 9.8183 7.18188L6.5683 3.93188Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
        </a>
        </nav>
        <RouterView/>
    </div>
    <Notification></Notification>
</template>


<style lang="css">

#user-container {
    overflow-y: scroll;
    height: 100%;
    background: white;
    color: black;
}
.content-list, .app-width {
    max-width: 500px;
    min-width: 150px;
    margin: 0 auto;
    padding: 10px;
}

#main-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 0px;
}

#main-nav svg {
    width: 25px;
    height: 25px;
}

</style>

<script setup>
import { RouterView, useRouter } from 'vue-router'
import { onBeforeUnmount, onMounted, onRenderTracked, provide, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserStore } from '../../stores/userStore';
import Notification from '../../components/Notification/index.vue'

const root = ref(null)

provide('scrollContainer', root)

const userStore = useUserStore()

const {accessToken, id, arena} = storeToRefs(userStore)

const isBottom = ref(false)
const router = useRouter()

const loadContents = async (opts) => {
    if( arena.value ) {
        if (fullyLoaded) { return }
        let result = await arena.value.user(props.slug).get(opts)
        contents.value = contents.value.concat(result.contents)
        if (contents.value.length == result.length) {
            fullyLoaded = true
        }
    } else {
        contents.value = []
        fullyLoaded = false
    }
}

const logout = async () => {
    await (() => accessToken.value = '')()
}

const onresize = () => {
}


watch(isBottom, async (newVal, oldVal) => {

    if(newVal) {
        page++
        await loadContents({page})
    }
})

watch(accessToken, () => {
    if (accessToken.value) {
        router.push('/')
    } else {
        router.push('/authorise')
    }
})


onMounted(() => {
    window.addEventListener('resize', onresize)
    onresize()
})

onBeforeUnmount(() =>{
    window.removeEventListener('resize', onresize)
})


</script>