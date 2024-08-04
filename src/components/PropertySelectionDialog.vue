<template>
    <ModalDialog
        ref="dialog"
        :title="title">
        <div class="field-container">
            <label for="property-select">Property</label>
            <SelectBox v-model="selectedProperty"
            :options="properties"
            placeholder="Choose a property"/>
        </div>
    </ModalDialog>
</template>

<script setup>

import { computed, ref } from 'vue';
import ModalDialog from './ModalDialog.vue';
import SelectBox from './SelectBox.vue'

const dialog = ref(null)
const selectedProperty = ref('')

const props = defineProps({
    data: {
        type: Object,
        required: false
    },
    title: String,
})

const onHandleChange = ref(async (p) => {console.log(p)})

const properties = computed(() => {
    return Object.keys(props.data).sort().filter(d => d !== 'image').map((d) => {
        return { label: d, value: d }
    })
})

const propertyValue = computed(() => {
    return props.data[selectedProperty.value]
})

const showDialog = async () => {
    return await dialog.value.showDialog()
}

defineExpose({
  showDialog,
  selectedProperty,
  onHandleChange
})

</script>