import Arena from 'are.na';
import { defineStore } from "pinia"
import { ref, watch } from "vue"

const defaultDatetimeFormat = 'MMMM Do YYYY, h:mm:ss a'

export const useUserStore = defineStore("user", () => {

  const id = ref("")
  const arena = ref(null)
  const accessToken = ref("")
  const datetimeFormat = ref( defaultDatetimeFormat )

  watch([accessToken, id], ()=> {
    if (accessToken.value != '' && id.value != '') {
        arena.value = new Arena({accessToken: accessToken.value})
    } else {
      arena.value = null
    }
  })

  return { accessToken, id, arena, datetimeFormat, defaultDatetimeFormat };

}, {persist: true, json: true});


// Vue Button Component