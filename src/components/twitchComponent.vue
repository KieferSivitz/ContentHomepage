<template>
    <div class="twitchComponent" :id="'twitchComponent' + componentNumber">
        <input type="text" :id="'twitchInput' + componentNumber" class="gridInput twitchInput" placeholder="Twitch Channel" v-model="twitchChannel"></input>
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
    componentNumber: -1,
    data () {
        const index = this.$store.state.componentIndexes.twitch
        this.$store.commit('addTwitchComponent', this._uid)
        // Figure out which info to load and load it
        return {
            twitchChannel: '',
            componentNumber: index
        }
    },
    methods: {
        renderPlayer (channelID) {
            const heightOffset = 60
            const widthOffset = 20
            const windowWidth = document.getElementById('twitchComponent' + this.componentNumber).style.width - widthOffset
            const windowHeight = document.getElementById('twitchComponent' + this.componentNumber).style.height - heightOffset

            const target = 'streamWindow' + this.componentNumber

            const options = {
                width: windowWidth,
                height: windowHeight,
                channel: channelID,
                autoplay: false
            }

            this.twitchPlayer = new window.Twitch.Player(target, options)
        },
        updatePlayer (text) {
            this.$store.commit('changeTwitchChannel', {channel: text, component: this.componentNumber})
        },
        registerListener () {
            const text = document.getElementById('twitchInput' + this.componentNumber).value
            this.updatePlayer(text)
        }
    },
    beforeMount () {
    },
    mounted () {
        const $ = function (selector) {
            return document.querySelector(selector);
        };
        this.renderPlayer(this.$store.state.twitchComponents[this.$store.state.componentCounts.twitch - 1].twitchChannel)
        this.$store.commit('storeTwitchPlayer', {player: this.twitchPlayer, component: this.$store.state.componentCounts.twitch - 1})

        $('#streamWindow' + this.componentNumber).firstChild.id = ('twitchPlayer' + this.componentNumber)
        // Initialize window resize listener
        resizeItem.methods.parentSize(('twitchPlayer' + this.componentNumber), 'twitchComponent' + this.componentNumber, 50, 20)

        const input = $('#twitchInput' + this.componentNumber)
        input.addEventListener('keyup', (e) => {
            e.preventDefault()
            if (e.keyCode === 13) {
                const text = e.target.value
                this.updatePlayer(text)
            }
        })
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.twitchComponent {
    padding: 10px;
}

input {
    display: none;
    position: absolute;
    left: 25%;
    width: 50%
}

</style>
