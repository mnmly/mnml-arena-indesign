import { createMemoryHistory, createRouter } from 'vue-router'

import ChannelListView from './components/ChannelListView/index.vue'
import ChannelDetailView from './components/ChannelDetailView/index.vue'

const routes = [
  { path: '/', component: ChannelListView },
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

export {
    router
}