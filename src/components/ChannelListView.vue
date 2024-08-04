<template>
    <div ref='root' class="content-list">
    <ChannelCellView ref="cellsRef" v-for="content in contents" :key="content.id" :channel="content">
        <slot/>
    </ChannelCellView>
    </div>
</template>


<script setup>

import { nextTick, onBeforeUnmount, onMounted, ref, watch, inject } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserStore } from '../stores/userStore';
import ChannelCellView from './ChannelCellView.vue'
import { useNotification } from '../composables/useNotification';

const {showNotification} = useNotification()

const root = ref(null)
const contents = ref([])
const cellsRef = ref(null)
const isBottom = ref(false)

const scrollContainer = inject('scrollContainer')

const userStore = useUserStore()
const {arena, id} = storeToRefs(userStore)


let page = 1
let fullyLoaded = false

watch(isBottom, async (newVal, oldVal) => {
    if(newVal) {
        page++
        await loadContents({page})
    }
})

const loadContents = async (opts) => {
    if( arena.value ) {
        if (fullyLoaded) { return }
        let result = await arena.value.user(id.value).channels(opts)
        contents.value = contents.value.concat(result)
        if (contents.value.length == result.attrs.length) {
            fullyLoaded = true
        }
    } else {
        contents.value = []
        fullyLoaded = false
    }
}

const onresize = () => {
    onscroll()
}

const onscroll = (e) => {
    let el = scrollContainer.value
    let threshold = el.scrollHeight - el.clientHeight
    if(threshold > 0) {
        isBottom.value = (el.scrollTop + 10) > threshold
    }
}

onMounted(async () => {
    const initLoad = async () => {
        page = 1
        fullyLoaded = false
        await loadContents({page})
    }
    if ( arena.value ) {
        await initLoad()
    } else {
        watch(arena, async() => await initLoad() )
    }
    scrollContainer.value.addEventListener('scroll', onscroll)
    window.addEventListener('resize', onresize)
    onresize()
})
// 
onBeforeUnmount(() =>{
    window.removeEventListener('resize', onresize)
})
</script>