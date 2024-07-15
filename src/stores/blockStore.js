import Arena from 'are.na';
import { defineStore } from "pinia"
import { ref, watch } from "vue"

export const useBlockStore = defineStore("block", () => {
  const id = ref("")
  const targetItem = ref(null)
  return { id, targetItem };
});
