<template>
    <div class="twitchComponent" :id="'twitchComponent' + componentNumber">
        <div>
            <input type="text" :id="'twitchInput' + componentNumber" value="Twitch Channel"></input>
        </div>
        <div :id="'streamWindow' + componentNumber">
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
    componentNumber: -1,
    data () {
        this.$store.commit('addTwitchComponent')
        this.componentNumber = this.$store.state.componentCounts.twitch - 1
        // Figure out which info to load and load it
        return {
            twitchChannel: this.$store.state.twitchComponents[this.$store.state.componentCounts.twitch - 1].twitchChannel,
            component: this.$store.state.componentCounts.twitch - 1
        }
    },
    methods: {
        renderPlayer (channelID) {
            const heightOffset = 60
            const widthOffset = 20
            const windowWidth = document.getElementById(this.componentName).style.width - widthOffset
            const windowHeight = document.getElementById(this.componentName).style.height - heightOffset

            const target = 'streamWindow' + this.componentNumber

            const options = {
                width: windowWidth,
                height: windowHeight,
                channel: channelID,
                autoplay: false
            }

            this.twitchPlayer = new window.Twitch.Player(target, options)
        }
    },

    beforeMount () {
    },
    mounted () {
        this.renderPlayer(this.twitchChannel)
        this.$store.commit('storeTwitchPlayer', {player: this.twitchPlayer, component: this.componentNumber})

        document.getElementById('streamWindow' + this.componentNumber).firstChild.id = ('twitchPlayer' + this.componentNumber)
        // Initialize window resize listener
        resizeItem.methods.initialSize(('twitchPlayer' + this.componentNumber), this.componentName, 60, 20)

        // Listener for channel changing
        document.getElementById('twitchInput' + this.componentNumber).addEventListener('keydown', (e) => {
            if (e.keyCode === 13) {
                const text = e.target.value
                this.$store.commit('changeTwitchChannel', {channel: text, component: this.component})
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
