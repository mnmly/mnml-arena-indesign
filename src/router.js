import { createMemoryHistory, createRouter } from 'vue-router'

import ChannelListView from './components/ChannelListView/index.vue'
import ChannelDetailView from './components/ChannelDetailView/index.vue'
import AuthView from './components/Auth/index.vue'
import { storeToRefs  } from 'pinia'
import { useUserStore } from './stores/userStore'
import { watch } from 'vue'

const routes = [
  { path: '/', component: ChannelListView },
  { path: '/authorise', component: AuthView },
  { path: '/channels/:slug', 
    component: ChannelDetailView,
    props: (route) => {
        return {
            slug: route.params.slug,
        }
    }
} ]

window.history = {}

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

let stateRestored = false

router.beforeEach(async (to, from, next) => {

  const userStore = useUserStore()
  const {accessToken} = storeToRefs(userStore)
  // If state hasn't been restored yet, wait for it
  if (!stateRestored) {
    await new Promise(resolve => {
      const unsubscribe = userStore.$subscribe((mutation, state) => {
        if (state.accessToken !== null) {
          stateRestored = true
          unsubscribe()
          resolve()
        }
      })

      setTimeout(() => {
        stateRestored = true
        unsubscribe()
        resolve()
      }, 5000) // 5 second timeout, adjust as needed
    })
  }

  if (!accessToken.value && to.path !== '/authorise') {
    next('/authorise')
  } else if (accessToken.value && to.path === '/authorise') {
    next('/')
  } else {
    next()
  }
})

export {
    router
}