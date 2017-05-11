<template>
    <div class="twitchComponent">
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
            var windowWidth = (document.getElementById('streamWindow').clientWidth - 40)
            var windowHeight = windowWidth * (9 / 16)
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
        document.getElementById('streamWindow').firstChild.id = 'twitchPlayer'
    }



}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.twitchComponent {
    padding: 10px;
    background: #72129b !important;
}

</style>
