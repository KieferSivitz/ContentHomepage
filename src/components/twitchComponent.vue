<template>
    <div class="twitchComponent">
        <div id="streamWindow">
        </div>
    </div>
</template>

<script>
import 'twitch-embed'; // eslint-disable-line

export default {
    initialWidthModifier: 0.68,
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
            player.setVolume(0.5)
        }

    },

    mounted () {
        // I know this is the same as the resizedEvent in the gridComponent but
        // I want to keep the components separate, the grid component deals with
        // The resizing events of the grid items only.
        this.renderPlayer('RiotGames')
        document.getElementById('streamWindow').firstChild.id = 'twitchPlayer'

        window.addEventListener('resize', function () {
            let width = Number(document.getElementById('gridComponent1').getBoundingClientRect().width) - 40
            let height = width * (9 / 16)
            console.log(width, height)
            document.getElementById('twitchPlayer').width = width
            document.getElementById('twitchPlayer').height = height
        })
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
