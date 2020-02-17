<!-- This component contains any notifications -->
<template>
    <div id="notification-container">
        <notification v-for="notif in getNotifications()" v-bind:text="notif" />
    </div>
</template>

<script>
    import Notification from "./Notification.vue";

    import { notifications } from "../../mixins/storeIO.js";

    export default {
        mixins: [notifications],

        components: {
            notification: Notification
        }
    };
</script>

<style scoped>
    #notification-container {
        grid-row: 1;
        grid-column: 1;
    }
</style>
