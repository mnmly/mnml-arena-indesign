<template>
    <RouterLink :to="`/channels/${channel.slug}`">
        <div ref="root" class="channel-cell" :class="`channel-${channel.status}`">
            <h3 class="title">{{ channel.title }}</h3>
            <div class="meta">
            <p>{{ channel.user.full_name }} ・ {{ channel.length }} blocks</p>
            <p>{{ fromNow(channel.updated_at) }}</p>
            </div>
        </div>
    </RouterLink>
</template>

<style>
.channel-cell {
    display: flex;
    align-items: start;
    justify-content: center;
    width: 100%;
    color: black;
    flex-direction: column;
    flex-wrap: nowrap;
    align-content: center;
    border: 1px solid rgb(222, 222, 222);
    margin: 5px 0;
    padding: 15px 10px;
    border-radius: 2px;
    text-decoration: none;
}

.channel-cell.channel-closed {
    border: 1px solid var(--colors-channelClosed3);
    color: var(--colors-channelClosed3);
}

.channel-cell.channel-public {
    border: 1px solid var(--colors-channelPublic3);
    color: var(--colors-channelPublic3);
}

.channel-cell.channel-private {
    border: 1px solid var(--colors-channelPrivate3);
    color: var(--colors-channelPrivate3)
}

.channel-cell .meta {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: flex-start;
    width: 100%;
    font-size: 10px;
    margin-top: 0.25em;
}

.channel-cell .title {
    font-weight: normal;
    margin: 0;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
.channel-cell:hover {
  border-color: rgb(51, 51, 51);
}
</style>

<script setup>

import moment from 'moment';
import {ref} from 'vue'
const size = ref(0)
const props = defineProps({
    channel: {
        type: Object,
        required: true
    }
})

const fromNow = (dateString) => {
    return moment(dateString).fromNow()
}

defineExpose({ size })
</script>