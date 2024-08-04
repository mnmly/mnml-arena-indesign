<template>
    <div ref='root' id="user-container">
        <nav v-if="accessToken" id="main-nav" class="app-width">
            <a @click.prevent="refresh" title="Refresh">
                <svg id="arena-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150.38 88.986"><path d="M148.93 62.356l-20.847-16.384c-1.276-1-1.276-2.642 0-3.645l20.848-16.38c1.28-1.002 1.815-2.695 1.19-3.76-.626-1.062-2.374-1.44-3.88-.84l-24.79 9.874c-1.507.606-2.927-.22-3.153-1.83L114.57 2.926C114.34 1.317 113.13 0 111.877 0c-1.247 0-2.456 1.317-2.68 2.925l-3.73 26.467c-.228 1.61-1.646 2.434-3.155 1.83l-24.38-9.71c-1.512-.602-3.975-.602-5.483 0l-24.384 9.71c-1.508.604-2.928-.22-3.154-1.83L41.186 2.925C40.956 1.317 39.748 0 38.5 0c-1.252 0-2.463 1.317-2.688 2.925l-3.73 26.467c-.226 1.61-1.645 2.434-3.153 1.83L4.14 21.35c-1.507-.603-3.252-.223-3.878.838-.625 1.066-.092 2.76 1.184 3.76l20.85 16.38c1.277 1.003 1.277 2.645 0 3.646L1.446 62.356C.166 63.358-.364 65.152.26 66.34c.627 1.19 2.372 1.668 3.877 1.064l24.567-9.866c1.51-.603 2.914.218 3.125 1.828l3.544 26.696c.214 1.607 1.618 2.923 3.12 2.923 1.5 0 2.905-1.315 3.12-2.923l3.55-26.696c.21-1.61 1.62-2.43 3.122-1.828l24.164 9.698c1.506.606 3.97.606 5.477 0l24.16-9.698c1.504-.603 2.91.218 3.125 1.828l3.55 26.696c.212 1.607 1.617 2.923 3.115 2.923 1.502 0 2.907-1.315 3.12-2.923l3.55-26.696c.216-1.61 1.62-2.43 3.124-1.828l24.57 9.866c1.5.604 3.25.125 3.876-1.063.627-1.186.094-2.98-1.185-3.982zM95.89 46.18L77.53 60.315c-1.285.99-3.393.99-4.674 0L54.49 46.18c-1.284-.99-1.294-2.62-.02-3.625l18.4-14.493c1.274-1.005 3.363-1.005 4.638 0l18.4 14.493c1.277 1.004 1.267 2.634-.02 3.626z"></path></svg>
            </a>
            <div class="icon-list">
            <RouterLink :to="`/settings`" title="Settings"><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.07095 0.650238C6.67391 0.650238 6.32977 0.925096 6.24198 1.31231L6.0039 2.36247C5.6249 2.47269 5.26335 2.62363 4.92436 2.81013L4.01335 2.23585C3.67748 2.02413 3.23978 2.07312 2.95903 2.35386L2.35294 2.95996C2.0722 3.2407 2.0232 3.6784 2.23493 4.01427L2.80942 4.92561C2.62307 5.2645 2.47227 5.62594 2.36216 6.00481L1.31209 6.24287C0.924883 6.33065 0.650024 6.6748 0.650024 7.07183V7.92897C0.650024 8.32601 0.924883 8.67015 1.31209 8.75794L2.36228 8.99603C2.47246 9.375 2.62335 9.73652 2.80979 10.0755L2.2354 10.9867C2.02367 11.3225 2.07267 11.7602 2.35341 12.041L2.95951 12.6471C3.24025 12.9278 3.67795 12.9768 4.01382 12.7651L4.92506 12.1907C5.26384 12.377 5.62516 12.5278 6.0039 12.6379L6.24198 13.6881C6.32977 14.0753 6.67391 14.3502 7.07095 14.3502H7.92809C8.32512 14.3502 8.66927 14.0753 8.75705 13.6881L8.99505 12.6383C9.37411 12.5282 9.73573 12.3773 10.0748 12.1909L10.986 12.7653C11.3218 12.977 11.7595 12.928 12.0403 12.6473L12.6464 12.0412C12.9271 11.7604 12.9761 11.3227 12.7644 10.9869L12.1902 10.076C12.3768 9.73688 12.5278 9.37515 12.638 8.99596L13.6879 8.75794C14.0751 8.67015 14.35 8.32601 14.35 7.92897V7.07183C14.35 6.6748 14.0751 6.33065 13.6879 6.24287L12.6381 6.00488C12.528 5.62578 12.3771 5.26414 12.1906 4.92507L12.7648 4.01407C12.9766 3.6782 12.9276 3.2405 12.6468 2.95975L12.0407 2.35366C11.76 2.07292 11.3223 2.02392 10.9864 2.23565L10.0755 2.80989C9.73622 2.62328 9.37437 2.47229 8.99505 2.36209L8.75705 1.31231C8.66927 0.925096 8.32512 0.650238 7.92809 0.650238H7.07095ZM4.92053 3.81251C5.44724 3.44339 6.05665 3.18424 6.71543 3.06839L7.07095 1.50024H7.92809L8.28355 3.06816C8.94267 3.18387 9.5524 3.44302 10.0794 3.81224L11.4397 2.9547L12.0458 3.56079L11.1882 4.92117C11.5573 5.44798 11.8164 6.0575 11.9321 6.71638L13.5 7.07183V7.92897L11.932 8.28444C11.8162 8.94342 11.557 9.55301 11.1878 10.0798L12.0453 11.4402L11.4392 12.0462L10.0787 11.1886C9.55192 11.5576 8.94241 11.8166 8.28355 11.9323L7.92809 13.5002H7.07095L6.71543 11.932C6.0569 11.8162 5.44772 11.5572 4.92116 11.1883L3.56055 12.046L2.95445 11.4399L3.81213 10.0794C3.4431 9.55266 3.18403 8.94326 3.06825 8.2845L1.50002 7.92897V7.07183L3.06818 6.71632C3.18388 6.05765 3.44283 5.44833 3.81171 4.92165L2.95398 3.561L3.56008 2.95491L4.92053 3.81251ZM9.02496 7.50008C9.02496 8.34226 8.34223 9.02499 7.50005 9.02499C6.65786 9.02499 5.97513 8.34226 5.97513 7.50008C5.97513 6.65789 6.65786 5.97516 7.50005 5.97516C8.34223 5.97516 9.02496 6.65789 9.02496 7.50008ZM9.92496 7.50008C9.92496 8.83932 8.83929 9.92499 7.50005 9.92499C6.1608 9.92499 5.07513 8.83932 5.07513 7.50008C5.07513 6.16084 6.1608 5.07516 7.50005 5.07516C8.83929 5.07516 9.92496 6.16084 9.92496 7.50008Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg></RouterLink>
            <a @click.prevent="logout" title="Log Out">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.95 1.50005C12.95 1.25152 12.7485 1.05005 12.5 1.05005C12.2514 1.05005 12.05 1.25152 12.05 1.50005L12.05 13.5C12.05 13.7486 12.2514 13.95 12.5 13.95C12.7485 13.95 12.95 13.7486 12.95 13.5L12.95 1.50005ZM6.5683 3.93188C6.39257 3.75614 6.10764 3.75614 5.93191 3.93188C5.75617 4.10761 5.75617 4.39254 5.93191 4.56827L8.41371 7.05007L0.499984 7.05007C0.251456 7.05007 0.0499847 7.25155 0.0499847 7.50007C0.0499846 7.7486 0.251457 7.95007 0.499984 7.95007L8.41371 7.95007L5.93191 10.4319C5.75617 10.6076 5.75617 10.8925 5.93191 11.0683C6.10764 11.244 6.39257 11.244 6.56831 11.0683L9.8183 7.81827C9.99404 7.64254 9.99404 7.35761 9.8183 7.18188L6.5683 3.93188Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
            </a>
            </div>
        </nav>

        <RouterView v-slot="{ Component }">
            <!-- <transition @before-enter="beforeEnter" @enter="enter" @before-leave="beforeLeave" @leave="leave"> -->
                <component :is="Component" ref="currentViewComponent" />
            <!-- </transition> -->
        </RouterView>
        <Notification></Notification>
    </div>
</template>


<script setup>
import gsap from 'gsap';
import { app } from 'indesign'
import { RouterView, useRouter } from 'vue-router'
import { onBeforeUnmount, onMounted, provide, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserStore } from '../stores/userStore';
import { getAssetFolder } from '../libs/import-arena';
import { useNotification } from '../composables/useNotification';
import { useBlockStore } from '../stores/blockStore';
import { useRoute } from 'vue-router';

import Notification from '../components/Notification.vue'

const root = ref(null)
const router = useRouter()
const userStore = useUserStore()
const blockStore = useBlockStore()
const { showNotification }= useNotification()
const {accessToken, id, arena} = storeToRefs(userStore)
const { targetItem } = storeToRefs(blockStore)
const route = useRoute();
const currentViewComponent = ref(null)

provide('scrollContainer', root)

const logout = async () => {
    await (() => accessToken.value = '')()
}

const onresize = () => {}
const refresh = async () => {
    if (route.path == '/') {
        await currentViewComponent.value.refresh(true)
    }

}

watch(accessToken, () => {
    if (accessToken.value) {
        router.push('/')
    } else {
        router.push('/authorise')
    }
})



const onAfterOpen = async (e) => {

    try {
        const doc = await app.activeDocument;
        let folder = await getAssetFolder(doc)
    } catch (e) {
        showNotification(e, 'alert')
    }
    
    const doc = await app.activeDocument;
    doc.removeEventListener("afterSelectionChanged", onSelectionChange);
    doc.addEventListener("afterSelectionChanged", onSelectionChange);
}

const onSelectionChange = (e) => {
    const selection = e.target.selection;
    if (selection.length > 0) {
        targetItem.value = selection[0]
    } else {
        targetItem.value = null
    }
}

onMounted(async () => {
    try {
        await onAfterOpen()
    } catch (e) {
        // if no active document found...
        app.addEventListener('afterActivate', onAfterOpen)
        showNotification(e.message, 'alert')
    }

    window.addEventListener('resize', onresize)
    onresize()
})

onBeforeUnmount(() =>{
    window.removeEventListener('resize', onresize)
})



// transitions
const beforeEnter = (el) => {
      gsap.set(el, { x: -root.value.clientWidth})
};

const enter = (el) => {
    console.log('enter', el);

    gsap.to(el, {
    duration: 1,
    opacity: 1,
    x: '0',
    ease: 'quint.out',
    });
};

const beforeLeave = (el) => {
    console.log('before leave');
    gsap.set(el, { x: '0%'})
};

const leave = (el, done) => {
    console.log('leave');

    gsap.to(el, {
    duration: 1,
    opacity: 1,
    x: root.value.clientWidth,
    ease: 'quint.out',
    onComplete: done,
    });
};


</script>

<style lang="css">
.icon-list {
    display: flex;
    width: 40px;
    justify-content: space-between;
}

#user-container {
    overflow-y: scroll;
    height: 100%;
    background: white;
    color: black;
}
.content-list, .app-width {
    max-width: 500px;
    min-width: 150px;
    margin: 0 auto;
    padding: 10px;
}

.page-view {
    margin-top: 30px;
}

#main-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 0px;
}

#main-nav svg {
    width: 15px;
    height: 15px;
    color: var(--colors-gray7);
}

#main-nav #arena-logo {
    width: 25px;
    height: 25px;
}

#main {
  padding: 4px
}

:root {
            --colors-gray0: #FFF;
            --colors-gray1: #F7F7F7;
            --colors-gray2: #EDEDED;
            --colors-gray3: #DEDEDE;
            --colors-gray4: #999;
            --colors-gray5: #696969;
            --colors-gray6: #333;
            --colors-gray7: #000;
            --colors-red1: #FAF4F3;
            --colors-red2: #DFBEBE;
            --colors-red3: #B93D3D;
            --colors-green1: #F4F8F3;
            --colors-green2: #B4D6B3;
            --colors-green3: #238020;
            --colors-blue1: #EBECF7;
            --colors-blue2: #3D46C2;
            --colors-blue3: #00075F;
            --colors-background: var(--colors-gray0);
            --colors-foreground: var(--colors-gray7);
            --colors-link: var(--colors-gray6);
            --colors-slate: var(--colors-gray5);
            --colors-foregroundShadow: rgba(0, 0, 0, 0.08);
            --colors-foregroundLight: rgba(0, 0, 0, 0.6);
            --colors-foregroundHeavy: rgba(0, 0, 0, 0.85);
            --colors-backgroundShadow: rgba(255, 255, 255, 0.08);
            --colors-backgroundLight: rgba(247, 247, 247, 0.6);
            --colors-backgroundHeavy: rgba(255, 255, 255, 0.95);
            --colors-channelPrivate1: var(--colors-red1);
            --colors-channelPrivate2: var(--colors-red2);
            --colors-channelPrivate3: var(--colors-red3);
            --colors-channelPublic1: var(--colors-green1);
            --colors-channelPublic2: var(--colors-green2);
            --colors-channelPublic3: var(--colors-green3);
            --colors-channelClosed1: var(--colors-gray1);
            --colors-channelClosed2: var(--colors-gray3);
            --colors-channelClosed3: var(--colors-gray6);
            --colors-brandDark: var(--colors-blue3);
            --colors-brandLight: var(--colors-blue1);
            --colors-focus: var(--colors-blue2);
            --colors-alert: #E15100;
            --colors-notification: #A87253;
            --colors-blend: multiply;
            --colors-blendInverted: screen;
            --fonts-sans: Arial, Helvetica, sans-serif;
            --fonts-serif: Times New Roman, Times, serif;
            --fonts-compact: Arial Narrow, Arial, Helvetica, sans-serif;
            --fonts-mono: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
            --space-1: 5px;
            --space-2: 10px;
            --space-3: 15px;
            --space-4: 20px;
            --space-5: 25px;
            --space-6: 35px;
            --space-7: 45px;
            --space-8: 65px;
            --space-9: 80px;
            --space-10: 100px;
            --space-11: 130px;
            --space-nudge: 2px;
            --sizes-1: 5px;
            --sizes-2: 10px;
            --sizes-3: 15px;
            --sizes-4: 20px;
            --sizes-5: 25px;
            --sizes-6: 35px;
            --sizes-7: 45px;
            --sizes-8: 65px;
            --sizes-9: 80px;
            --sizes-10: 100px;
            --sizes-11: 130px;
            --sizes-nudge: 2px;
            --fontSizes-1: 0.78125rem;
            --fontSizes-2: 0.9rem;
            --fontSizes-3: 1rem;
            --fontSizes-4: 1.2rem;
            --fontSizes-5: 1.5rem;
            --fontSizes-6: 1.75rem;
            --fontSizes-7: 2rem;
            --fontSizes-8: 2.5rem;
            --fontSizes-9: 3rem;
            --radii-1: 3px;
            --radii-round: 50%;
            --radii-pill: 9999px;
            --shadows-1: 0px 0px 20px 0px var(--colors-foregroundShadow);
            --blurs-1:blur(15px)
        }


        
.slide-enter-active,
.slide-leave-active {
  transition: all 0.75s ease-out;
}

.slide-enter-to {
  position: absolute;
  right: 0;
}

.slide-enter-from {
  position: absolute;
  right: -100%;
}

.slide-leave-to {
  position: absolute;
  left: -100%;
}

.slide-leave-from {
  position: absolute;
  left: 0;
}
</style>

