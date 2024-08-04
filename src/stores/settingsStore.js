import Arena from 'are.na';
import { defineStore } from "pinia"
import { ref, watch } from "vue"

const defaultDatetimeFormat = 'MMMM Do YYYY, h:mm:ss a'

export const useSettingsStore = defineStore("settings", () => {

  const useCache = ref( true )
  const datetimeFormat = ref( defaultDatetimeFormat )

  return { datetimeFormat, useCache, defaultDatetimeFormat };

}, {persist: true, localStorage: true});


// Vue Button Component