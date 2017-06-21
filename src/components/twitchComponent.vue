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
            const heightOffset = 60
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
        const channelID = this.$store.state.twitchChannel
        window.addEventListener('load', () => {
            this.twitchPlayer = this.renderPlayer(channelID)
            this.$store.commit('storeTwitchPlayer', this.twitchPlayer)

            document.getElementById('streamWindow').firstChild.id = 'twitchPlayer'
            // Initialize window resize listener
            resizeItem.methods.initialSize('twitchPlayer', 'gridComponent1', 60, 20)

            // Listener for channel changing
            document.getElementById('twitchInput').addEventListener('keydown', (e) => {
                if (e.keyCode === 13) {
                    const text = e.target.value
                    this.$store.commit('changeTwitchChannel', text)
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
