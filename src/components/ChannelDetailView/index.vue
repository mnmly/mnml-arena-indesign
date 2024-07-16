<template>
    <div class="content-list">
        <RouterLink to="/">Back</RouterLink>
        <button @click="test">test</button>
        <button @click="importContents">Import Contents</button>
        <BlockCellView ref="contentsRef" v-for="content in contents" :key="content.id" :content="content" @click="onclick(content)" :class="selectedClass(content)"></BlockCellView>
        <div>{{ slug }}</div>
    </div>
</template>

<script setup>

import { app, LocationOptions } from 'indesign'
import { onMounted, ref, onBeforeUnmount, inject, watch } from 'vue';

import { RouterLink } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useUserStore } from '../../stores/userStore';
import { useBlockStore } from '../../stores/blockStore'
import BlockCellView from './../BlockCellView/index.vue'

import { updateItem } from '../../libs/import-arena';
import { createBoilerplateSpread } from '../../libs/master-boilerplate';

const blockStore = useBlockStore()
const userStore = useUserStore()

const blockID = storeToRefs(blockStore).id
const { arena } = storeToRefs(userStore)

const contents = ref([])
const contentsRef = ref(null)
const isBottom = ref(false)
const props = defineProps({
    slug: {
        type: String,
        required: true
    }
})

const selectedClass = (content) => {
    return {
        selected: content.id === blockID.value
    }
}

const scrollContainer = inject('scrollContainer')

let page = 1
let fullyLoaded = false

const loadContents = async (opts) => {
    if( arena.value ) {
        if (fullyLoaded) { return }
        let result = await arena.value.channel(props.slug).get(opts)
        contents.value = contents.value.concat(result.contents)
        console.log(result.contents)
        if (contents.value.length == result.length) {
            fullyLoaded = true
        }
    } else {
        contents.value = []
        fullyLoaded = false
    }
}
const onresize = () => {
    // root.value.height = root.value.parentElement.clientHeight + 'px'
    if ( contentsRef.value && contentsRef.value.length > 0 ) {
        let w = contentsRef.value[0].$el.clientWidth
        contentsRef.value.forEach((d) => {
            d.size = w
        })
    }
    onscroll()
}

watch(isBottom, async (newVal, oldVal) => {

    if(newVal) {
        page++
        await loadContents({page})
    }
})

const test = async () => {
    let doc = await app.activeDocument;
    createBoilerplateSpread(doc, 'demo')
}

const importContents = async () => {

    if (!fullyLoaded) {
        while(!fullyLoaded) {
            page++
            await loadContents({page})
        }
    }

    let doc = await app.activeDocument;
    let types = ['image', 'text', 'attachment']
    let spreads = {}

    types.forEach( (t) => {
        let spread = doc.masterSpreads.itemByName(`A-${t}`);
        if (spread.isValid) {
            spreads[t] = spread
        } else if (t == 'image'){
            createBoilerplateSpread(doc, t)
            alert('Master Spread: `A-image` is automatically created')
        } else {
            alert('Master Spread: `A-' + t + '` is not available.\nRefer to `A-image` master spread.')
        }
    })

    function overrideItem(page, itemName) {
        var masterItem = page.masterPageItems.find((d) => d.name == itemName);
        if (masterItem && masterItem.isValid) {
            return masterItem.override(page);
        } else {
            alert("Item '" + itemName + "' not found on master page.");
            return null;
        }
    }

    contents.value.forEach(async ( content )=>{

        let masterSpread = spreads[content.class.toLowerCase()]
        if (!masterSpread) { return console.log(`masterSpread for ${content.class} is not prepared. Make 'A-${content.class.toLowerCase()}' Master Spread`)}

        let newPage = doc.pages.add(LocationOptions.AT_END)
        newPage.appliedMaster = masterSpread

        Object.keys(content).forEach(async (key) => {
            var item = overrideItem(newPage, key);
            if (item && item.isValid) {
                await updateItem(item, content, key)
            }
        })
    })
}

const onscroll = (e) => {
    let el = scrollContainer.value
    let threshold = el.scrollHeight - el.clientHeight
    if(threshold > 0) {
        isBottom.value = (el.scrollTop + 10) > threshold
    }
}

const onclick = (content) => {
    blockID.value = content.id
}

onMounted(async () =>{ 
    page = 1
    fullyLoaded = false
    await loadContents({page})
    window.addEventListener('resize', onresize)
    scrollContainer.value.addEventListener('scroll', onscroll)
    onresize()
})
onBeforeUnmount(() =>{
    window.removeEventListener('resize', onresize)
    scrollContainer.value.removeEventListener('scroll', onscroll)
})

</script>