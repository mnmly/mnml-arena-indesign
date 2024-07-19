<template>
    <div class="field-container flex-container">
        <label v-text="labelTitle"></label>
        <input v-if="type=='text'" type="text" v-model="inputValue"/>
        <input v-if="type=='checkbox'" type="checkbox" v-model="inputValue"/>
    </div>
</template>

<style>

.field-container input[type='text'] {
    background: none;
    border: none;
    appearance: none;
    background: #333;
    border-radius: 3px;
    padding-bottom: 3px;
    flex: 1;
    min-width: 50px;

}

.field-container {
    margin-top: 0.5em;
 }

  
.field-container label{
    min-width: 110px;
}

</style>

<script setup>

import toTitleCase from 'to-title-case';
import { reactive, computed, watch, ref } from 'vue'

const props = defineProps({
    label: String,
    type: String,
    modelValue: [String, Number, Boolean]
})

const inputValue = ref(props.modelValue)

const emit = defineEmits(['update:modelValue']) // Define the emit

const labelTitle = computed(() => {
    return toTitleCase(props.label)
})

watch(() => props.modelValue, (newValue) => {
  inputValue.value = newValue
})

watch(inputValue, (newValue) => {
  emit('update:modelValue', typeof(newValue) == 'string' ? newValue.trim() : newValue)
})
</script>