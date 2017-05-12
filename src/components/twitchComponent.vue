<template>
    <div class="twitchComponent">
        <input type="text" id="twitchInput"> </input>
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
            var windowWidth = (window.innerWidth * 0.68)
            var windowHeight = windowWidth * (9 / 16)

            var target = 'streamWindow'

            var options = {
                width: windowWidth,
                height: windowHeight,
                channel: channelID,
                autoplay: false
            }

            var player = new window.Twitch.Player(target, options)
            return player;
        }

    },

    mounted () {
        // I know this is the same as the resizedEvent in the gridComponent but
        // I want to keep the components separate, the grid component deals with
        // The resizing events of the grid items only.

        var twitchComponent = this
        var twitchPlayer = twitchComponent.renderPlayer('vgbootcamp')
        document.getElementById('streamWindow').firstChild.id = 'twitchPlayer'

        // Listener for window resizing
        window.addEventListener('resize', function () {
            let width = Number(document.getElementById('gridComponent1').getBoundingClientRect().width) - 40
            let height = width * (9 / 16)
            let maxHeight = document.getElementById('gridComponent1').getBoundingClientRect().height
            if (height > maxHeight) {
                height = maxHeight - 40
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
