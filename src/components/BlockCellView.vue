<template>
    <div class="block-cell">
        <div class="cell-square" :style="{'height': size + 'px'}">
            <div class='block-image' v-if="content.class == 'Image'" :style="{'background-image': `url(${content.image.square.url})`}"></div>
            <div class='block-link' v-if="content.class == 'Link'" :style="{'background-image': `url(${content.image.square.url})`}"></div>
            <!-- <div class='block-attachment' v-if="content.class == 'Attachment'" :style="{'background-image': `url(${content.image.square.url})`}"></div> -->
            <div class='block-text' v-if="content.class == 'Text'">
                <div v-html="content.content"></div>
            </div>

            <div class="cta">
                <a @click.prevent="openOwnLink"
                    :href="sourceURL">Source</a>
                <a v-show="targetItem" @click.prevent="onImportArena">Insert</a>
            </div>
        </div>
        <p class="title">{{content.title}}</p>
    </div>
</template>

<style>

.cell-square {
    position: relative;
    border: 1px solid var(--colors-gray2);
}
.block-cell:hover .cta {
    display: flex;
}

.cell-square .cta {
    position: absolute;
    bottom: 0;
    width: 100%;
    display: none;
    padding: 5px;
}

.cell-square .cta a {
    display: block;
    flex: 1;
    display: block;
    margin: 5px;
    padding: 10px;
    background-color: rgba(255, 255, 255, 0.95);
    color: inherit;
    text-decoration: none;
    border-radius: 3px;
    border: 1px solid transparent;
    font-weight: bold;
}
.cell-square .cta a:hover {
    border: 1px solid var(--colors-gray3);
}

.block-image, .block-link {
    height: 100%;
    background-size: contain;
}

.block-cell {
    margin-bottom: 20px;
    text-align: center;
    cursor: pointer;
    display: inline-block;
    width: 50%;
    padding: 5px;
}

.block-cell.selected {
    outline: 1px solid black;
}

.block-cell .title {
    white-space: nowrap;
    overflow: hidden;
    width: 100%;
    text-overflow: ellipsis;
    margin-top: 0.5em;
    color: var(--colors-gray5);
}

</style>
<script setup>

import { Rectangle } from 'indesign'
import { computed, inject, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '../stores/userStore'
import { useBlockStore } from '../stores/blockStore'
import { getArenaData, updateItem } from '../libs/import-arena';
import { openURL } from '../libs/utils'

const userStore = useUserStore()
const blockStore = useBlockStore()

const { accessToken, datetimeFormat } = storeToRefs(userStore)
const { targetItem } = storeToRefs(blockStore)

const size = ref(0)
const props = defineProps({
    content: Object
})

const dialog = inject('dialog')
const updateBlockData = inject('updateBlockData')

const sourceURL = computed(() => {
    if (props.content.source) {
        return props.content.source.url
    } else if(props.content.image) {
        return props.content.image.original.url
    }
})
let data

const watchPropertyChange = () => {
    return watch(() => dialog.value.selectedProperty, async (newVal, oldVal) => {
        try {
            let item = targetItem.value
            let p = newVal
            await updateItem(item, data, p, datetimeFormat.value )
        } catch (e) {
            console.log(e)
        }
    })
}

const onImportArena = async (e) => {

    let item = targetItem.value
    let id = props.content.id
    data = await getArenaData(id, accessToken.value, true)

    // If is image, download the image
    if (item instanceof Rectangle) {
        await updateItem(item, data, 'image')
    } else {
        let prevName = item.name
        let prevContents = item.contents
        let unwatch
        try {
            updateBlockData(data)
            unwatch = watchPropertyChange()
            let result = await dialog.value.showModal()
            if (result == 'cancel') {
                item.name = prevName
                item.contents = prevContents
            }
        } catch (e) {
            console.log(e)
        }
        unwatch()
    }
}

const openOwnLink = async (e) => {
    await openURL(e.target.href)
}

defineExpose( { size } )
</script>