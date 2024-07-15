<template>
    <RouterLink :to="`/channels/${channel.slug}`">
        <div ref="root" class="channel-cell" :class="`channel-${channel.status}`" :style="{'height': size + 'px'}">
            <h3 class="title">{{ channel.title }}</h3>
            <b>by {{ channel.user.full_name }}</b>
            <p>{{ channel.count }}</p>
        </div>
    </RouterLink>
</template>

<style>
.channel-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  color: black;
  flex-direction: column;
  flex-wrap: nowrap;
  align-content: center;
  border: 2px solid rgb(222, 222, 222);
  margin: 10px 0;
}

.channel-cell .title {
    font-weight: normal;
}
.channel-cell:hover {
  border-color: rgb(51, 51, 51);
}
</style>

<script setup>

import {ref} from 'vue'
const size = ref(0)
const props = defineProps({
    channel: {
        type: Object,
        required: true
    }
})

defineExpose({ size })
</script>