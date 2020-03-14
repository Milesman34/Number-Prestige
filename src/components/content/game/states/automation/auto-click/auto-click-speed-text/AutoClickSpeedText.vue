<!-- This component displays how fast auto-click currently is -->
<template>
    <div id="autoclick-speed-text" v-bind:class="themeClass('text')">
        Based on your Prestige Points, Auto-Click currently clicks {{ getRenderedPreText() }}<auto-click-speed-display v-bind:number="getRenderedNumber()"></auto-click-speed-display>{{ getRenderedPostText() }}
    </div>
</template>

<script>
    import AutoClickSpeedDisplay from "./AutoClickSpeedDisplay.vue";

    export default {
        methods: {
            // Returns the text rendered before the number
            getRenderedPreText() {
                return this.isClickIntervalSubSecond() ? "once every " : "";
            },

            // Returns the number rendered
            getRenderedNumber() {
                return this.isClickIntervalSubSecond() ? this.getAutoClickInterval() : 1 / this.getAutoClickInterval();
            },

            // Returns the text rendered after the number
            getRenderedPostText() {
                return this.isClickIntervalSubSecond() ? " seconds" : ` time${this.pluralEnding(this.getAutoClickInterval())} per second`;
            }
        },

        components: {
            "auto-click-speed-display": AutoClickSpeedDisplay
        }
    };
</script>

<style scoped>
    #autoclick-speed-text {
        width: 40%;

        font-size: 85%;

        text-align: center;
    }
</style>
