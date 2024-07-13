import { defineStore } from "pinia"
import { ref } from "vue"

export const useUserStore = defineStore("user", () => {
  const accessToken = ref("")
  return { accessToken };
}, {persist: true});
