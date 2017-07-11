<template>
    <div class="twitchChatComponent" :id="'twitchChat' + _uid">
        <input type="text" class="gridInput" id="twitchChatInput" value="Chat Channel"></input>
        <iframe v-bind:src="twitchSource"
                frameborder="0"
                scrolling="no"
                id="twitchChat"
                :width="props.width"
                :height="props.height"
                allowfullscreen="true"
                style="visibility: hidden">
        </iframe>
    </div>
</template>

<script>
import inputListener from '../mixins/inputListener.js'
import resizeItem from '../mixins/resizeItem.js'


export default {
    name: 'twitchChatComponent',
    mixins: [resizeItem, inputListener],
    data () {
        this.$store.commit('addTwitchChatComponent')
        return {
            msg: 'Welcome to the social media aggregator!',
            twitchSource: 'https://www.twitch.tv/' + this.$store.state.twitchChatComponents[0].twitchChatChannel + '/chat',
            props: {
                width: 40,
                height: 40
            }
        }
    },

    mounted () {
        resizeItem.methods.parentSize('twitchChat', 'twitchChat' + this._uid, 60, 20)
        inputListener.methods.createListener('twitchChatInput', this)
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.twitchChatComponent {
    margin: 10px;
}

.input-descriptor {
    line-height: 1.6em;
}
</style>
