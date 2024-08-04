<!-- SelectBox.vue -->
<template>
    <div class="select-box" @click="toggleDropdown" @blur="closeDropdown">
      <div class="selected-option">
        {{ selectedOption ? selectedOption.label : placeholder }}
        <span class="arrow" :class="{ 'arrow-up': isOpen }">▼</span>
      </div>
      <ul v-if="isOpen" class="options">
        <li
          v-for="option in options"
          :key="option.value"
          @click.stop="selectOption(option)"
          :class="{ 'selected': option.value === modelValue }"
        >
          {{ option.label }}
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
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
  
  const selectedOption = computed(() => 
    props.options.find(option => option.value === props.modelValue)
  );
  
  const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
  };
  
  const closeDropdown = () => {
    isOpen.value = false;
  };
  
  const selectOption = (option) => {
    isOpen.value = false;
    emit('update:modelValue', option.value);
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
  
  .options {
    position: absolute;
    top: 100%;
    left: 0px;
    right: -20px;
    background-color: white;
    /* border: 1px solid #ccc; */
    border-top: none;
    border-radius: 0 0 4px 4px;
    list-style-type: none;
    padding: 0;
    margin: 0;
    max-height: 200px;
    overflow-y: auto;
    z-index: 1;
    text-align: right;
    padding-top: 10px;}
  
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