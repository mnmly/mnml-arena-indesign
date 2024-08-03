import { ref } from 'vue'

const notifications = ref([])
let nextId = 0

export const useNotificationStore = () => {
  const addNotification = (message, type = 'info', duration = 3000) => {
    const id = nextId++
    notifications.value.push({ id, message, type, duration })
    
    // Auto-remove notification after duration
    setTimeout(() => {
      removeNotification(id)
    }, duration)

    return id
  }

  const removeNotification = (id) => {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index !== -1) {
      notifications.value.splice(index, 1)
    }
  }

  return {
    notifications,
    addNotification,
    removeNotification
  }
}

// Create a single instance of the store
export const notificationStore = useNotificationStore()