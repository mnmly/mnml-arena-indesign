<!-- DialogComponent.vue -->
<template>
  <Teleport to="#main-panel">
    <div v-if="isVisible" class="dialog-overlay" @click="handleCancel">
      <div class="dialog-content" @click.stop>
        <h2 v-if="title" class="dialog-title">{{ title }}</h2>
        <div class="dialog-body">
          <slot></slot>
        </div>
        <div class="dialog-footer">
          <a @click.prevent="handleCancel" class="dialog-btn cancel-btn">Cancel</a>
          <a @click.prevent="handleSubmit" class="dialog-btn submit-btn">Submit</a>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: 'Dialog'
  }
});

const isVisible = ref(false);
let resolvePromise;

const showDialog = () => {
  isVisible.value = true;
  return new Promise((resolve) => {
    resolvePromise = resolve;
  });
};

const handleCancel = () => {
  isVisible.value = false;
  resolvePromise('cancel');
};

const handleSubmit = () => {
  isVisible.value = false;
  resolvePromise('submit');
};

defineExpose({ showDialog });
</script>

  
  <style scoped>
  .dialog-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--colors-gray7);
  }
  
  .dialog-content {
    background-color: white;
    padding: 20px;
    border-radius: 3px;
    max-width: 500px;
    width: 90%;
  }
  
  .dialog-title {
    font-size: 1.5em;
    margin-bottom: 15px;
  }

  .dialog-footer {
    display: flex;
    margin-right: 10px;
  }

  .dialog-btn {
    font-weight: bold;
    background: var(--colors-gray1);
    height: 28px;
    padding-left: var(--space-3);
    padding-right: var(--space-3);
    font-size: var(--fontSizes-2);
    display: inline-flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
    border: 1px solid transparent;
    border-radius: 3px;
  }
  .dialog-btn:hover {
    border-color: var(--colors-gray3);
  }
  .dialog-btn:active {
    border-color: var(--colors-gray7);
  }
  
  .dialog-body {
    margin-bottom: 20px;
  }
  
  .dialog-close-btn {
    padding: 8px 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .dialog-close-btn:hover {
    background-color: #0056b3;
  }
  </style>