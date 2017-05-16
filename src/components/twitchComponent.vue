<template>
    <div class="twitchComponent">
        <span style="color: white;">Change the channel: &nbsp;</span> <input type="text" id="twitchInput"></input>
        <div id="streamWindow">
        </div>
    </div>
</template>

<script>
import 'twitch-embed'; // eslint-disable-line

export default {
    name: 'twitchComponent',
    data () {
        return {
            msg: 'Welcome to the social media aggregator!'
        }
    },

    methods: {
        renderPlayer: (channelID) => {
            var windowWidth = (window.innerWidth * 0.47)
            var windowHeight = windowWidth * (9 / 16)

            if (windowHeight >= (20 * 30)) {
                windowHeight = 20 * 36
            }

            var target = 'streamWindow'

            var options = {
                width: windowWidth,
                height: windowHeight,
                channel: channelID,
                autoplay: true
            }

            var player = new window.Twitch.Player(target, options)
            return player;
        }

    },

    mounted () {
        var twitchPlayer = this.renderPlayer('tradechat')
        document.getElementById('streamWindow').firstChild.id = 'twitchPlayer'

        // Listener for window resizing
        window.addEventListener('resize', function () {
            let offset = 70
            let width = Number(document.getElementById('gridComponent1').getBoundingClientRect().width) - offset
            let height = width * (9 / 16)
            let maxHeight = document.getElementById('gridComponent1').getBoundingClientRect().height
            if (height > (maxHeight - offset)) {
                height = maxHeight - offset
            }
            document.getElementById('twitchPlayer').width = width
            document.getElementById('twitchPlayer').height = height
        })

        // Listener for channel changing
        document.getElementById('twitchInput').addEventListener('keydown', function (e) {
            if (e.keyCode === 13) {
                let text = e.target.value
                twitchPlayer.setChannel(text)
            }
        })
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.twitchComponent {
    padding: 10px;
}

</style>
