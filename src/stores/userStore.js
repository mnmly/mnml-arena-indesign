import Arena from 'are.na';
import { defineStore } from "pinia"
import { ref, watch } from "vue"

export const useUserStore = defineStore("user", () => {
  const accessToken = ref("")
  const id = ref("")
  const arena = ref(null)

  watch([accessToken, id], ()=> {
    if (accessToken.value != '' && id.value != '') {
        arena.value = new Arena({accessToken: accessToken.value})
    } else {
      arena.value = null
    }
  })
  return { accessToken, id, arena};
}, {persist: true});
