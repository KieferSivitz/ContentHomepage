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
    displayInput: true,
    data () {
        return {
            twitchChannel: this.$store.state.twitchChannel,
            msg: 'Welcome to the social media aggregator!',
            displayInput: this.$store.state.custom
        }
    },
    methods: {
        renderPlayer: (channelID) => {
            const heightOffset = 70
            const widthOffset = 20
            const windowWidth = Number(document.getElementById('gridComponent1').getBoundingClientRect().width) - widthOffset
            const windowHeight = Number(document.getElementById('gridComponent1').getBoundingClientRect().height) - heightOffset

            const target = 'streamWindow'

            const options = {
                width: windowWidth,
                height: windowHeight,
                channel: channelID,
                autoplay: false
            }

            return new window.Twitch.Player(target, options)
        }
    },

    mounted () {
        const _this = this
        const channelID = this.$store.state.twitchChannel
        window.addEventListener('load', () => {
            _this.twitchPlayer = this.renderPlayer(channelID)
            document.getElementById('streamWindow').firstChild.id = 'twitchPlayer'
            // Initialize window resize listener
            resizeItem.methods.initialSize('twitchPlayer', 'gridComponent1', 60, 20)

            // Listener for channel changing
            document.getElementById('twitchInput').addEventListener('keydown', function (e) {
                if (e.keyCode === 13) {
                    const text = e.target.value
                    _this.twitchPlayer.setChannel(text)
                    _this.$store.commit('changeTwitchChannel', text)
                }
            })

            // All Listeners for Navigation
            const nums = document.getElementById('navbar');
            const listItem = nums.getElementsByTagName('li');

            let i = 0
            const length = listItem.length
            for (i = 0; i < length; i++) {
                const index = i - 1
                listItem[i].addEventListener('click', function (e) {
                    const hub = defaultHubs.hubList[index] // eslint-disable-line
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
