<template>
    <div class="wrapper">

        <LabelledField label="block-id" type="text" v-model="id"></LabelledField>
        <LabelledField label="use-cache" type="checkbox" v-model="block.useCache"></LabelledField>

        <div class="action-button-container flex-container" v-show="block.hasValidID && targetItem">
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
import { getArenaData, getArenaImageFromData, getAssetFolder } from '../../libs/import-arena';
import { useUserStore } from '../../stores/userStore'
import { useBlockStore } from '../../stores/blockStore'
import { storeToRefs } from 'pinia';
import BlockPropertySelectionDialog from '../BlockPropertySelectionDialog/index.vue'

const userStore = useUserStore()
const blockStore = useBlockStore()
const {accessToken} = storeToRefs(userStore)
const {id, targetItem} = storeToRefs(blockStore)
const blockData = ref(null)
const textImportDialog = ref(null)

const block = reactive({
    isImageItem: computed(() => {
        return (targetItem.value instanceof Rectangle)
    }),
    hasValidID: computed(() => {
        return !isNaN(parseInt(id.value, 10))
    })
})


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
            targetItem.value.name = `arena.${p}-${id.value}`
            targetItem.value.contents = (v || "").toString()
        } catch (e) {
            console.log(e)
        }
    })
})

const onOpenURL = (e) => {
    openURL("https://are.na/block/" + id.value);
}

const onImportArena = async (e) => {

    let item = targetItem.value
    let data = await getArenaData(id.value, accessToken.value, block.useCache)
    blockData.value = data

    // If is image, download the image
    if (block.isImageItem) {
        item.name = `arena-${id.value}`
        item.place(await getArenaImageFromData(data, block.useCache))
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

watch(() => id.value, (newValue) => {
    if (/are\.na/.test(newValue)) {
        let _id = extractBlockId(newValue)
        if (_id) { id.value = _id }
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
    let _id
    if (selection.length > 0) {
        targetItem.value = selection[0]
        _id = getIDFromString(selection[0].name || "")
        if (!isNaN(_id)) {
            id.value = _id
        }
    } else {
        targetItem.value = null
    }
}

onMounted(() => {
    setupActiveDocumentListener()
})

</script>