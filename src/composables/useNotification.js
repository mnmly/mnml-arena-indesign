// composables/useNotification.js
import { notificationStore } from '../stores/notificationStore'

export function useNotification() {
  const showNotification = (message, type = 'info', duration = 5000) => {
    return notificationStore.addNotification(message, type, duration)
  }

  const closeNotification = (id) => {
    notificationStore.removeNotification(id)
  }

  return {
    showNotification,
    closeNotification
  }
}