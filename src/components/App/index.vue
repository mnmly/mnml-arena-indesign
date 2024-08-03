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

import Main from './../Main/index.vue'
import UpdateItem from './../UpdateItem/index.vue'
import NotificationView from './../Notification/index.vue'

</script>
