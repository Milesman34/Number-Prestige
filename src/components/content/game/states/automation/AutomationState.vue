<!-- This component represents the automation tab of the game -->
<template>
    <div id="automation">
        <div id="automation-next-unlock">
            <automation-next-unlock-text text="Unlock Auto-Click at 1000 points" v-if="!isAutoClickUnlocked()"></automation-next-unlock-text>
            <automation-next-unlock-text text="Unlock Auto-Prestige at 25 Prestige Points" v-if="isAutoClickUnlocked() && !isAutoPrestigeUnlocked()"></automation-next-unlock-text>
        </div>

        <auto-click v-if="isAutoClickUnlocked()"></auto-click>
    </div>
</template>

<script>
    import AutomationNextUnlockText from "./AutomationNextUnlockText.vue";

    import AutoClick from "./auto-click/AutoClick.vue";

    import { autoClick, autoPrestige } from "../../../../../mixins/storeIO.js";

    export default {
        mixins: [autoClick, autoPrestige],

        components: {
            "automation-next-unlock-text": AutomationNextUnlockText,
            "auto-click": AutoClick
        }
    };
</script>

<style scoped>
    #automation {
        width: 100%;
        height: 100%;

        display: grid;

        grid-template-rows: 12% 18% 12% auto;
    }

    #automation-next-unlock {
    	width: 100%;
    	height: 100%;

    	display: flex;

        justify-content: center;
        align-items: center;
    }
</style>
