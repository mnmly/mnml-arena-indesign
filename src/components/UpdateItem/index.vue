<template>
    <div class="wrapper">

        <LabelledField label="block-id" type="text" v-model="block.id"></LabelledField>
        <LabelledField label="use-cache" type="checkbox" v-model="block.useCache"></LabelledField>

        <div class="action-button-container flex-container" v-show="block.hasValidID && block.targetItem">
            <button class='action-button' id="open-url" @click="onOpenURL">Open URL</button>
            <button class='action-button' id="import-arena" @click="onImportArena" v-text="block.isImageItem ? 'Insert Image' : 'Insert Text'"></button>
        </div>
        
    </div>
    <BlockPropertySelectionDialog ref="textImportDialog" v-bind:data="blockData"></BlockPropertySelectionDialog>
</template>

<script setup>
import { app, Rectangle } from 'indesign'
import { reactive, watch, computed, onMounted, ref, nextTick } from 'vue'
import LabelledField from '../LabelledField/index.vue'
import { extractBlockId, getIDFromString, openURL } from '../../libs/utils';
import { getArenaData, getArenaImage, getArenaImageFromData, getAssetFolder, importArena } from '../../libs/import-arena';
import { useUserStore } from '../../stores/userStore';
import { storeToRefs } from 'pinia';
import BlockPropertySelectionDialog from '../BlockPropertySelectionDialog/index.vue'

const userStore = useUserStore()
const {accessToken} = storeToRefs(userStore)
const block = reactive({
    id: '',
    useCache: true,
    targetItem: null,
    isImageItem: computed(() => {
        return (block.targetItem instanceof Rectangle)
    }),
    hasValidID: computed(() => {
        return !isNaN(parseInt(block.id, 10))
    })
})

const blockData = ref(null)
const textImportDialog = ref(null)

const onOpenURL = (e) => {
    openURL("https://are.na/block/" + block.id);
}

onMounted(async () => {
    try {
        const doc = app.activeDocument;
        let folder = await getAssetFolder(doc)
    } catch (e) {
        console.log(e)
    }

    watch(() =>textImportDialog.value.selectedProperty, (newVal, oldVal) => {
        try {
            let p = textImportDialog.value.selectedProperty
            let v = blockData.value[p]
            block.targetItem.name = `arena.${p}-${block.id}`
            block.targetItem.contents = (v || "").toString()
        } catch (e) {
            console.log(e)
        }
    })
})



const onImportArena = async (e) => {

    let item = block.targetItem
    let data = await getArenaData(block.id, accessToken.value, !block.useCache)
    blockData.value = data

    if (block.isImageItem) {
        item.name = `arena-${block.id}`
        item.place(await getArenaImageFromData(block.id, data))
    } else {
        let prevName = item.name
        let prevContents = item.contents
        try {
            let result = await textImportDialog.value.showModal()
            if (result == 'cancel') {
                item.name = prevName
                item.contents = prevContents
            }
        } catch (e) {
            console.log(e)
        }
    }

}

watch(() => block.id, (newValue) => {
  if (/are\.na/.test(newValue)) {
    let id = extractBlockId(newValue)
    if (id) {
        block.id = id
    }
  }
}, {immediate: true})

// Set up listener for the active document
function setupActiveDocumentListener() {
    const activeDocument = app.activeDocument;
    if (activeDocument) {
        setupSelectionChangeListener(activeDocument);
    } else {
        console.log("No active document");
    }
}

function setupSelectionChangeListener(doc) {
    if (doc) {
        doc.removeEventListener("afterSelectionChanged", onSelectionChange);
        doc.addEventListener("afterSelectionChanged", onSelectionChange);
    }
}
function onSelectionChange(event) {
    const selection = event.target.selection;
    let id
    if (selection.length > 0) {
        block.targetItem = selection[0]
        id = getIDFromString(selection[0].name || "")
        if (!isNaN(id)) {
            block.id = id
        }
    } else {
        block.targetItem = null
    }
}

onMounted(() => {
    setupActiveDocumentListener()
})

</script>