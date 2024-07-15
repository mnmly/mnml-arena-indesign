<template>
    <dialog ref="dialog" id="dialog" @close="visible = false">
        <form method="dialog" v-if="data">
        <div class="flex-container">
            <label for="property-select">Property</label>
            <select v-model="selectedProperty" @change="handleChange">
                <option v-for="property in properties" :key="property" :value="property" v-text="property"></option>
            </select>
        </div>
        <!-- <section>
            <label for="property-select-preview">Content Preview</label>
            <div id="property-select-preview" v-text="propertyValue"></div>
        </section> -->
        <footer>
            <button id="dialog-cancel-button" uxp-variant="primary" type="reset" @click="close('cancel')">Cancel</button>
            <button type="submit" uxp-variant="cta">Create</button>
        </footer>
        </form>
    </dialog>
</template>

<script setup>
import { computed, ref, watch } from 'vue';

const dialog = ref(null)
const selectedProperty = ref('title')
const props = defineProps({
    data: {
        type: Object,
        required: false
    }
})

const visible = ref(false);
const showModal = async () => {
    let el = document.getElementById('dialog')
    visible.value = true
    return await el.showModal()
};

const handleChange = (e) => {
    selectedProperty.value = e.target.value
}

const close = (returnVal) =>  {
    let el = document.getElementById('dialog')
    el.close(returnVal)
}

const properties = computed(() => {
    return Object.keys(props.data)
})

const propertyValue = computed(() => {
    return props.data[selectedProperty.value]
})

defineExpose({
  showModal,
  selectedProperty,
  visible
})

</script>