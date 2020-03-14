<!-- Represents a button that can be used to select a list -->
<template>
    <button
        class="theme-selector-list-button"
        v-bind:class="[themeClass('selector-hover'), themeClass('selector-item'), themeClass('text')]"
        @click="setTheme(theme)">{{ capitalize(theme) }}
    </button>
</template>

<script>
    export default {
        props: ["theme"]
    };
</script>

<style scoped>
    .theme-selector-list-button {
        width: 100%;
        height: 50%;

        display: flex;

        justify-content: center;
        align-items: center;

        font-size: 155%;
    }
</style>
