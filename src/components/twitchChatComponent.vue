<template>
    <div class="twitchChatComponent">
        <iframe frameborder="0"
                scrolling="no"
                id="twitchChat"
                src="https://www.twitch.tv/tradechat/chat"
                :width="props.width"
                :height="props.height"
                allowfullscreen="true"
                style="visibility: hidden">
        </iframe>
    </div>
</template>

<script>

export default {
    name: 'twitchChatComponent',
    data () {
        return {
            msg: 'Welcome to the social media aggregator!',
            props: {
                width: 40,
                height: 40
            }
        }
    },

    methods: {
    },

    mounted () {
        window.addEventListener('load', () => {
            let chat = document.getElementById('twitchChat')
            let container = document.getElementById('gridComponent2').getBoundingClientRect()
            let newheight = Number(container.height) - 40;
            let newwidth = Number(container.width) - 40

            chat.height = newheight
            chat.width = newwidth
            chat.style.visibility = 'visible'
        })
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.twitchChatComponent {
    margin: 10px;
}
</style>
