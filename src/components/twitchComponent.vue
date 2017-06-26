<template>
    <div class="twitchComponent">
        <input type="text" :id="'twitchInput' + _uid" value="Twitch Channel"></input>
        <div :id="'streamWindow' + _uid">
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
    props: ['componentName'],
    data () {
        this.$store.commit('addTwitchComponent')
        // Figure out which info to load and load it
        return {
            twitchChannel: this.$store.state.twitchComponents[this.$store.state.componentCounts.twitch - 1].twitchChannel,
            component: this.$store.state.componentCounts.twitch - 1,
            gridItem: 'gridComponent1'
        }
    },
    methods: {
        renderPlayer (channelID) {
            const heightOffset = 60
            const widthOffset = 20
            const windowWidth = Number(document.getElementById(this.componentName).getBoundingClientRect().width) - widthOffset
            const windowHeight = Number(document.getElementById(this.componentName).getBoundingClientRect().height) - heightOffset

            const target = 'streamWindow' + this._uid

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
        const channelID = this.twitchChannel
        window.addEventListener('load', () => {
            this.twitchPlayer = this.renderPlayer(channelID)
            this.$store.commit('storeTwitchPlayer', {player: this.twitchPlayer, component: this.component})

            document.getElementById('streamWindow' + this._uid).firstChild.id = 'twitchPlayer' + this._uid
            // Initialize window resize listener
            resizeItem.methods.initialSize('twitchPlayer' + this._uid, this.componentName, 60, 20)

            // Listener for channel changing
            document.getElementById('twitchInput' + this._uid).addEventListener('keydown', (e) => {
                if (e.keyCode === 13) {
                    const text = e.target.value
                    this.$store.commit('changeTwitchChannel', {channel: text, component: this.component})
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
