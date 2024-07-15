<template>
    <div ref='root' class="content-list">
    <ChannelCellView ref="cellsRef" v-for="channel in channels" :key="channel.id" :channel="channel">
        <slot/>
    </ChannelCellView>
    </div>
</template>


<script setup>

import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserStore } from '../../stores/userStore';
import ChannelCellView from '../ChannelCellView/index.vue'

const root = ref(null)
const channels = ref([])
const cellsRef = ref(null)

const userStore = useUserStore()
const {arena, id} = storeToRefs(userStore)

const onresize = () => {
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

const loadChannels = async () => {
    try{

    if(arena.value) {
        channels.value = await arena.value.user(id.value).channels()
    } else {
        channels.value = []
    }
    } catch (e) {
        console.log(e)
    }
}

watch(arena, async (newVal, oldVal) => {
    await loadChannels()
})

onMounted(async () => {
//     let arena = new Arena({accessToken: accessToken.value})
//     channels.value = await arena.user(id.value).channels()
    await loadChannels()
    window.addEventListener('resize', onresize)
    onresize()
})
// 
onBeforeUnmount(() =>{
    window.removeEventListener('resize', onresize)
})

</script>