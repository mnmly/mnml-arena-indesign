<script setup>
</script>

<template>
  <div class="field-container flex-container">
    <label for="block-id">Block ID</label>
    <input id="block-id" type="text"/>
  </div>
  <div class="field-container flex-container">
    <label for="block-use-cache">Use Cache</label>
    <input id="block-use-cache" type="checkbox" checked/>
  </div>

  <div class="action-button-container flex-container">
    <button class='action-button' id="open-url">Open URL</button>
    <button class='action-button' id="import-arena">Insert Item</button>
  </div>
</template>

<style>
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

</style>