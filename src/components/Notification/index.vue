<!-- components/NotificationView.vue -->
<template>
    <Teleport to="body">
      <TransitionGroup name="notification">
        <div
          v-for="notification in notifications"
          :key="notification.id"
          class="notification"
          :class="notification.type"
        >
          <div class="notification-content">
            {{ notification.message }}
          </div>
          <button @click="closeNotification(notification.id)" class="close-button">&times;</button>
        </div>
      </TransitionGroup>
    </Teleport>
  </template>
  
  <script setup>
  import { notificationStore } from '../../stores/notificationStore'
  import { useNotification } from '../../composables/useNotification'
  
  const { notifications } = notificationStore
  const { closeNotification } = useNotification()
  </script>
  
  <style scoped>
.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 15px 20px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 300px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
}

.notification-content {
  margin-right: 15px;
}

.close-button {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: inherit;
  opacity: 0.7;
}

.close-button:hover {
  opacity: 1;
}

.info {
  background-color: #2196F3;
  color: white;
}

.success {
  background-color: #4CAF50;
  color: white;
}

.warning {
  background-color: #FFC107;
  color: black;
}

.error {
  background-color: #F44336;
  color: white;
}

.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from,
.notification-leave-to {
  opacity: 0;
  transform: translateY(-50px);
}
</style>
