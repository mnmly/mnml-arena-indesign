<template>
<NavView :title="`Settings`"></NavView>
 <div class="app-width page-view">
 <div class="field-container">
    <label for="use-cache">
        Use Cache
    </label>
    <input type="checkbox" name="use-cache" v-model="useCache"/>
</div>
<div class="field-container">
    <label for="datetime-format">
        DateTime Format
    </label>
    <div>
        <input type="text" name="datetime-format" v-model="datetimeFormat"/>
        <p class="note">
            <div class="preview">Preview: {{ datePreview }}</div>
            <span v-show="isDatetimeFormatModified">Reset the value to <a href="#" @click.prevent="resetDatetimeFormat">default format</a>.</span>
            Refer to <a href="https://momentjs.com/docs/#/displaying/format/" target="_blank" @click="openOwnLink">moment.js</a> for available format string.
        </p>
    </div>
 </div>
</div>

</template>

<script setup>

import { storeToRefs } from 'pinia';
import { useSettingsStore } from '../stores/settingsStore';
import { computed } from 'vue';
import moment from 'moment'
import NavView from './NavView.vue';

const settingsStore = useSettingsStore()
const { useCache, datetimeFormat } = storeToRefs(settingsStore)
const datePreview = computed( () => {
    return moment().format(datetimeFormat.value)
})

const isDatetimeFormatModified = computed(() => {
    return datetimeFormat.value != settingsStore.defaultDatetimeFormat
})

</script>

<style>
.field-container {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid var(--colors-gray4);
    padding: 10px 0;
    align-items: flex-start;
}
.field-container input{
    margin: 0;
}

.field-container input[type="text"]{
    font-family: var(--fonts-sans);
    background: transparent;
    color: inherit;
    border: none;
    outline: none;
    border-color: transparent;
    color: black;
    appearance: none;
    text-align: right;
    margin: 0;
    position: relative;
    left: -6px;
    top: -4px;
}

.field-container .note {
    color: var(--colors-slate);
}
</style>