<template>
        <nav>
            <div class="flex app-width">
                <RouterLink to="/" class="back">
                    <svg version="1.1" id="Flat" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 800 800" style="enable-background:new 0 0 800 800;" xml:space="preserve"> <path d="M217.5,410c0-9.9,3.9-19.5,11-26.5l250-250c14.7-14.6,38.4-14.6,53,0c14.6,14.6,14.6,38.4,0,53L308,410l223.5,223.5 c14.6,14.7,14.6,38.4,0,53c-14.6,14.6-38.4,14.6-53,0l-250-250C221.4,429.5,217.5,420,217.5,410z"/> </svg>
                </RouterLink>
                <div>
                    <h5 class="title">{{ title }}</h5>
                </div>
                <div></div>
            </div>
        </nav>
    
</template>

<script setup>
import { RouterLink } from 'vue-router';
defineProps({
  title: String,
})
console.log()
</script>

<style scoped>

.back {
    color: inherit;
}
.back svg{
    width: 20px;
    height: 20px;
}

.flex {
    display: flex;
    justify-content: space-between;
}

nav {
    position: fixed;
    background-color: var(--colors-gray0);
    width: 95%;
    left: 0;
    top: 0;
    padding: 10px;
}

</style>