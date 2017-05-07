<template>
    <div class="twitchComponent">
        <div id="streamWindow"></div>
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
            var windowWidth = document.getElementById('streamWindow').clientWidth
            var windowHeight = (document.getElementById('streamWindow').clientWidth * (9 / 16))
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
        window.addEventListener('resize', function (event) {
            let width = document.getElementById('streamWindow').clientWidth
            let height = (document.getElementById('streamWindow').clientWidth * (9 / 16))
            document.getElementById('streamWindow').firstChild.width = width
            document.getElementById('streamWindow').firstChild.height = height
        })
    }



}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.twitchComponent {
    width:  70%;
    margin: 20px;
    padding: 20px;
    border: 2px solid #00D8FF;
    background: #DDEEFF;
}

</style>
