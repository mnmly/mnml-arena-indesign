<!-- components/NotificationView.vue -->
<template>
  <div class="notification-stack">
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
          <!-- <button @click="closeNotification(notification.id)" class="close-button"> -->
            <svg @click="closeNotification(notification.id)" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
          <!-- </button> -->
        </div>
      </TransitionGroup>
  </div>
  </template>
  
  <script setup>
  import { notificationStore } from '../stores/notificationStore'
  import { useNotification } from '../composables/useNotification'
  
  const { notifications } = notificationStore
  const { closeNotification } = useNotification()
  </script>
  
  
<style scoped>

.notification-stack {
  position: fixed;
  bottom: 5px;
  right: 0px;
  display: flex;
  width: 390px;
  z-index: 1000;
  max-width: 100%;
  flex-direction: column;
  padding: 0 20px 0 10px;
}

.notification {
  padding: 10px;
  border-radius: 3px;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  display: flex;
  margin: 3px 0;
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
  background-color: var(--colors-gray1);
  color: var(--colors-link);
}

.info {
  background-color: var(--colors-blue1);
  color: var(--colors-foreground);
}

.success {
  background-color: #4CAF50;
  color: white;
}

.warning {
  background-color: #FFC107;
  color: black;
}

.alert {
  background-color:var(--colors-gray2);
  color:var(--colors-alert);
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
