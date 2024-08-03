<template>
    <uxp-panel panelid="mainPanel" id="main-panel">
    <Main></Main>
    </uxp-panel>
    <uxp-panel panelid="blockPanel" id="block-panel">
    <UpdateItem></UpdateItem>
    </uxp-panel>
    <NotificationView />
</template>

<script setup>

import Main from './Main.vue'
import UpdateItem from './UpdateItem.vue'
import NotificationView from './Notification.vue'

</script>
