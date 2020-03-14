<!-- This button toggles auto-click -->
<template>
    <button class="automation-toggle-button" v-bind:class="[themeClass('text'), themeClass('game-button')]" @click="func">{{ text }}: {{ condition() ? "On" : "Off" }}</button>
</template>

<script>
    export default {
        props: ["text", "func", "condition"]
    };
</script>

<style scoped>
    .automation-toggle-button {
        user-select: none;
        padding: 5px;
    }
</style>
