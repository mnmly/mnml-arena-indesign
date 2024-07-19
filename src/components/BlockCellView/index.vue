<template>
    <div class="block-cell" @click="onclick">
        <div class="cell-square" :style="{'height': size + 'px'}">
            <div class='block-image' v-if="content.class == 'Image'" :style="{'background-image': `url(${content.image.square.url})`}"></div>
            <div class='block-link' v-if="content.class == 'Link'" :style="{'background-image': `url(${content.image.square.url})`}"></div>
            <!-- <div class='block-attachment' v-if="content.class == 'Attachment'" :style="{'background-image': `url(${content.image.square.url})`}"></div> -->
            <div class='block-text' v-if="content.class == 'Text'">
                <div v-html="content.content"></div>
            </div>
        </div>
        <p class="title">{{content.title}}</p>
    </div>
</template>

<style>
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
}

</style>
<script setup>
import { ref } from 'vue'

const size = ref(0)
const props = defineProps({
    content: Object
})

defineExpose( { size } )
</script>