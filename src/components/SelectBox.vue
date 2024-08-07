<!-- SearchableSelectBox.vue -->
<template>
  <div class="select-box" @blur="closeDropdown">
    <div class="selected-option" @click="toggleDropdown">
      {{ selectedOption ? selectedOption.label : placeholder }}
      <span class="arrow" :class="{ 'arrow-up': isOpen }">▼</span>
    </div>
    <div v-if="isOpen" class="dropdown-content">
      <input
        ref="filterInput"
        v-model="searchQuery"
        @input="filterOptions"
        @keydown.esc="cancelSearch"
        @keydown.delete="handleDelete"
        placeholder="Search..."
        class="search-input"
      />
      <ul class="options">
        <li
          v-for="option in filteredOptions"
          :key="option.value"
          @click.stop="selectOption(option)"
          :class="{ 'selected': option.value === modelValue }"
        >
          {{ option.label }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue';

const filterInput = ref(null)

const props = defineProps({
  modelValue: [String, Number],
  options: {
    type: Array,
    default: () => []
  },
  placeholder: {
    type: String,
    default: 'Select an option'
  }
});

const emit = defineEmits(['update:modelValue']);

const isOpen = ref(false);
const searchQuery = ref('');
const filteredOptions = ref([...props.options]);

const selectedOption = computed(() => 
  props.options.find(option => option.value === props.modelValue)
);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    searchQuery.value = '';
    filteredOptions.value = [...props.options];
  }
};

const closeDropdown = () => {
  isOpen.value = false;
  searchQuery.value = '';
  filteredOptions.value = [...props.options];
};

const selectOption = (option) => {
  isOpen.value = false;
  searchQuery.value = '';
  filteredOptions.value = [...props.options];
  emit('update:modelValue', option.value);
};

const filterOptions = () => {
  filteredOptions.value = props.options.filter(option =>
    option.label.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
};

const cancelSearch = () => {
  searchQuery.value = '';
  filteredOptions.value = [...props.options];
};

const handleDelete = (event) => {
  if (searchQuery.value === '') {
    cancelSearch();
  }
};
</script>

<style scoped>
.select-box {
  position: relative;
  width: 200px;
  user-select: none;
}

.selected-option {
  cursor: pointer;
  text-align: right;
}

.arrow {
  float: right;
  transition: transform 0.3s ease;
}

.arrow-up {
  transform: rotate(180deg);
}

.dropdown-content {
  position: absolute;
  top: 100%;
  left: 0;
  right: -20px;
  background-color: white;
  border-radius: 0 0 4px 4px;
  z-index: 1;
  margin-top: 11px;
}

.search-input {
  width: 80%;
  padding: 8px;
  border-radius: 4px 4px 0 0;
  background: transparent;
  border: transparent;
  outline: none;
  appearance: none;
  color: black;
}

.options {
  list-style-type: none;
  padding: 0;
  margin: 0;
  max-height: 200px;
  overflow-y: auto;
  text-align: right;
}

.options li {
  padding: 10px;
  cursor: pointer;
}

.options li:hover {
  background-color: #f0f0f0;
}

.options li.selected {
  background-color: #e0e0e0;
}
</style>