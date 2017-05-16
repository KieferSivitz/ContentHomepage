<template>
    <div class="twitchChatComponent">
        <iframe frameborder="0"
                scrolling="no"
                id="twitchChat"
                src="https://www.twitch.tv/tradechat/chat"
                width="740"
                height="300"
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
    margin: 10px;
}
</style>
