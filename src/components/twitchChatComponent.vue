<template>
    <div class="twitchChatComponent">
        <span class="input-descriptor" style="color: white;">Change the chat channel: </span><input type="text" id="twitchChatInput"></input>
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
            let newheight = Number(container.height) - 100;
            let newwidth = Number(container.width) - 40

            chat.height = newheight
            chat.width = newwidth
            chat.style.visibility = 'visible'
        })

        // Listener for channel changing
        document.getElementById('twitchChatInput').addEventListener('keydown', function (e) {
            if (e.keyCode === 13) {
                let text = e.target.value
                document.getElementById('twitchChat').setAttribute('src', 'https://www.twitch.tv/' + text + '/chat')
            }
        })
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.twitchChatComponent {
    margin: 10px;
}

.input-descriptor {
    line-height: 1.6em;
}
</style>
