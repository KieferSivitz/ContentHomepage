<template>
    <div class="streamComponent">
        <div id="streamWindow"></div>
    </div>
</template>

<script>
import 'twitch-embed'; // eslint-disable-line

export default {
    name: 'streamComponent',
    data () {
        return {
            msg: 'Welcome to the social media aggregator!'
        }
    },

    methods: {
        renderPlayer: (channelID) => {
            var windowWidth = 854
            var windowHeight = 480
            var target = 'streamWindow'

            var options = {
                width: windowWidth,
                height: windowHeight,
                channel: channelID,
                autoplay: false
            }

            var player = new window.Twitch.Player(target, options)
            player.setVolume(0.5)
        }
    },

    mounted () {
        this.renderPlayer('RiotGames')
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.streamComponent {
    margin: 20px;
    padding: 20px;
    border: 2px solid #00D8FF;
    background: #DDEEFF;
}

</style>
