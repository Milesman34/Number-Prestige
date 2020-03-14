<!-- This component contains any notifications -->
<template>
    <div id="notification-container">
        <notification v-for="notif in getNotifications()" v-bind:text="notif" />
    </div>
</template>

<script>
    import Notification from "./Notification.vue";

    export default {
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
