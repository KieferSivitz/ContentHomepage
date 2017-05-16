<template>
    <div class="twitchChatComponent">
        <iframe frameborder="0"
                scrolling="no"
                id="twitchChat"
                src="https://www.twitch.tv/twitch_scar/chat"
                height="640"
                width="480"
                allowfullscreen="true">
        </iframe>
    </div>
</template>

<script>

export default {
    name: 'twitchChatComponent',
    data () {
        return {
            msg: 'Welcome to the social media aggregator!'
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.twitchChatComponent {
    padding: 10px, 10px, 10px, 10px;
}
</style>
