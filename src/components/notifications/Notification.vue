<!-- This component represents a notification -->
<template>
    <div class="notification notification-on" v-bind:class="themeClass('notification')">{{ text }}</div>
</template>

<script>
    export default {
        props: ["text"]
    };
</script>

<style scoped>
    @keyframes notification-fadeout {
        0% {
            opacity: 1;
        }

        75% {
            opacity: 1;
        }

        100% {
            opacity: 0;
        }
    }

    .notification {
    	position: absolute;

    	right: 0;

    	height: 5%;

        z-index: 1;

        display: flex;

        justify-content: center;
        align-items: center;

        text-align: center;

        color: black;

    	padding-left: 5px;
    	padding-right: 5px;

    	user-select: none;
    }

    .notification-on {
        opacity: 0;
        animation-name: notification-fadeout;
        animation-duration: 2s;
    }

    /* Notification themes */
    .notification-light {
    	color: black;
    	font-family: "Open Sans";

        font-size: 82%;

    	background-color: rgb(52, 204, 235);
    }

    .notification-dark {
    	color: black;
    	font-family: "Open Sans";

        font-size: 82%;

    	background-color: rgb(52, 204, 235);
    }

    .notification-gradient {
    	color: black;
    	font-family: "Plex Mono";

        font-size: 75%;

    	background-image: linear-gradient(rgb(2, 176, 210), rgb(52, 204, 235));
    }
</style>
