<template>
    <div class="twitchComponent">
        <input type="text" id="twitchInput" value="Twitch Channel"></input>
        <div id="streamWindow">
        </div>
    </div>
</template>

<script>
import 'twitch-embed'; // eslint-disable-line
import resizeItem from '../mixins/resizeItem.js'
import inputListener from '../mixins/inputListener.js'
var defaultHubs = require('../configuration/hubs.json')

export default {
    name: 'twitchComponent',
    mixins: [resizeItem, inputListener],
    data () {
        return {
            twitchChannel: this.$store.state.twitchChannel,
            msg: 'Welcome to the social media aggregator!'
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
        var _this = this
        let channelID = this.$store.state.twitchChannel
        window.addEventListener('load', () => {
            _this.twitchPlayer = this.renderPlayer(channelID)
            document.getElementById('streamWindow').firstChild.id = 'twitchPlayer'
            // Initialize window resize listener
            resizeItem.methods.initialSize('twitchPlayer', 'gridComponent1', 60, 20)

            // Listener for channel changing
            document.getElementById('twitchInput').addEventListener('keydown', function (e) {
                if (e.keyCode === 13) {
                    let text = e.target.value
                    _this.twitchPlayer.setChannel(text)
                    _this.$store.commit('changeTwitchChannel', text)
                }
            })

            // All Listeners for Navigation
            var nums = document.getElementById('navbar');
            var listItem = nums.getElementsByTagName('li');

            var i = 0
            for (i = 0; i < listItem.length; i++) {
                let index = i - 1
                listItem[i].addEventListener('click', function (e) {
                    let hub = defaultHubs.hubList[index] // eslint-disable-line
                    _this.twitchPlayer.setChannel(hub.twitchChannel)
                    _this.$store.commit('changeTwitchChannel', hub.twitchChannel)
                    _this.$store.commit('changeTwitchChatChannel', hub.twitchChannel)
                    _this.$store.commit('changeTwitterFeed', {user: 'KieferSivitz', list: hub.twitterList})
                })
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
