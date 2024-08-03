<template>
    <div v-if="activated">
        + Insert block
    </div>
</template>

<script setup>

import { app, Rectangle } from 'indesign'
import { reactive, watch, computed, onMounted, ref } from 'vue'
import { extractBlockId, getIDFromString, openURL, showAlert } from '../libs/utils';
import { getArenaData, getAssetFolder, updateItem } from '../libs/import-arena';
import { useUserStore } from '../stores/userStore'
import { useBlockStore } from '../stores/blockStore'
import { storeToRefs } from 'pinia';
import BlockPropertySelectionDialog from '../BlockPropertySelectionDialog.vue'
import moment from 'moment';

const userStore = useUserStore()
const blockStore = useBlockStore()
const {accessToken, datetimeFormat } = storeToRefs(userStore)
const { id, targetItem } = storeToRefs(blockStore)

window.__app = app

const blockData = ref(null)
const textImportDialog = ref(null)

const isDatetimeFormatModified = computed(() => {
    return datetimeFormat.value != userStore.defaultDatetimeFormat
})

const activated = compuated( () => {
    return targetItem.value && id.value
} )

const block = reactive({
    useCache: true,
    isImageItem: computed(() => {
        return (targetItem.value instanceof Rectangle)
    }),
    hasValidID: computed(() => {
        return !isNaN(parseInt(id.value, 10))
    })
})

onMounted(async () => {

    try {
        const doc = await app.activeDocument;
        let folder = await getAssetFolder(doc)
    } catch (e) {
        console.log(e.message)
    }

    watch(() =>textImportDialog.value.selectedProperty, async (newVal, oldVal) => {
        try {
            let item = targetItem.value
            let p = textImportDialog.value.selectedProperty
            await updateItem(item, blockData.value, p, datetimeFormat.value )
        } catch (e) {
            console.log(e)
        }
    })
})

const onOpenURL = async (e) => {
    await openURL("https://are.na/block/" + id.value);
}

const onImportArena = async (e) => {

    let item = targetItem.value
    let data = await getArenaData(id.value, accessToken.value, block.useCache)
    blockData.value = data

    // If is image, download the image
    if (block.isImageItem) {
        await updateItem(item, data, 'image', datetimeFormat.value )
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

const onAfterOpen = async (e) => {
    if (e) {
        console.log(e.currentTarget)
    }
    const doc = await app.activeDocument;
    doc.removeEventListener("afterSelectionChanged", onSelectionChange);
    doc.addEventListener("afterSelectionChanged", onSelectionChange);
}

// Set up listener for the active document
const setupActiveDocumentListener = async () => {
}


onMounted(async () => {
    console.log('on mounted')
    try {
        await onAfterOpen()
    } catch (e) {
        // if no active document found...
        app.addEventListener('afterActivate', onAfterOpen)
        console.log(e.message)
    }
})

</script>