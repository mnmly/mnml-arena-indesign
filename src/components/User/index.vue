<template>
    <div ref='root' id="user-container">
        <RouterView/>
    </div>
</template>


<style lang="css">
#user-container {
    overflow-y: scroll;
    height: 100%;
    background: white;
    color: black;
}

.content-list {
    padding: 10px;
}

</style>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { nextTick, onBeforeUnmount, onMounted, onRenderTracked, provide, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserStore } from '../../stores/userStore';
import Arena from 'are.na';
import ChannelCellView from '../ChannelCellView/index.vue'

const root = ref(null)
const channels = ref([])
const cellsRef = ref(null)

provide('scrollContainer', root)

const userStore = useUserStore()
const {accessToken, id} = storeToRefs(userStore)

const onresize = () => {
    // root.value.height = root.value.parentElement.clientHeight + 'px'
    if ( cellsRef.value && cellsRef.value.length > 0 ) {
        let w = cellsRef.value[0].$el.clientWidth
        cellsRef.value.forEach((d) => {
            d.size = w
        })
    }
}

watch(channels, () => {
    nextTick(onresize)
})

watch([accessToken, id], async (newVal, oldVal) => {
    if (accessToken.value != '' && id.value != '') {
        let arena = new Arena({accessToken: accessToken.value})
        channels.value = await arena.user(id.value).channels()
    }
})

onMounted(() => {
//     let arena = new Arena({accessToken: accessToken.value})
//     channels.value = await arena.user(id.value).channels()
    window.addEventListener('resize', onresize)
    onresize()
})
// 
onBeforeUnmount(() =>{
    window.removeEventListener('resize', onresize)
})

</script>