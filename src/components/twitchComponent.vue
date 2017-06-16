<template>
    <div class="twitchComponent">
        <span class="input-descriptor" style="color: white;">Change the channel: </span><input type="text" id="twitchInput"></input>
        <div id="streamWindow">
        </div>
    </div>
</template>

<script>
import 'twitch-embed'; // eslint-disable-line

export default {
    name: 'twitchComponent',
    twitchPlayer: undefined,
    data () {
        return {
            twitchChannel: this.$store.state.twitchChannel,
            msg: 'Welcome to the social media aggregator!'
        }
    },
    watch: {
        'twitchChannel': {
            deep: true,
            handler: function (val) {
                console.log('Hi')
            }
        }
    },
    methods: {
        renderPlayer: (channelID) => {
            let heightOffset = 70
            let widthOffset = 20
            var windowWidth = Number(document.getElementById('gridComponent1').getBoundingClientRect().width) - widthOffset
            var windowHeight = Number(document.getElementById('gridComponent1').getBoundingClientRect().height) - heightOffset

            var target = 'streamWindow'

            var options = {
                width: windowWidth,
                height: windowHeight,
                channel: channelID,
                autoplay: false
            }

            return new window.Twitch.Player(target, options)
        }

    },

    mounted () {
        var that = this
        window.addEventListener('load', () => {
            let channelID = localStorage.getItem('twitchChatChannel') || this.twitchChannel
            var twitchPlayer = this.renderPlayer(channelID)
            document.getElementById('streamWindow').firstChild.id = 'twitchPlayer'

            // Listener for window resizing
            window.addEventListener('resize', function () {
                let heightOffset = 70
                let widthOffset = 20
                let width = Number(document.getElementById('gridComponent1').getBoundingClientRect().width) - widthOffset
                let height = width * (9 / 16)
                let maxHeight = document.getElementById('gridComponent1').getBoundingClientRect().height
                if (height > (maxHeight - heightOffset)) {
                    height = maxHeight - heightOffset
                }
                document.getElementById('twitchPlayer').width = width
                document.getElementById('twitchPlayer').height = height
            })

            // Listener for channel changing
            document.getElementById('twitchInput').addEventListener('keydown', function (e) {
                if (e.keyCode === 13) {
                    let text = e.target.value
                    twitchPlayer.setChannel(text)
                    that.$store.commit('changeTwitchChannel', text)
                }
            })
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
