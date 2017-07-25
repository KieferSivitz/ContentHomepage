<template>
    <div class="twitchChatComponent" :id="'twitchChat' + componentNumber">
        <input type="text" class="gridInput" :id="'twitchChatInput' + componentNumber" value="Chat Channel"></input>
        <iframe v-bind:src="twitchSource"
                frameborder="0"
                scrolling="no"
                :id="'twitchChatWindow' + componentNumber"
                :width="props.width"
                :height="props.height"
                allowfullscreen="true">
        </iframe>
    </div>
</template>

<script>
import inputListener from '../mixins/inputListener.js'
import resizeItem from '../mixins/resizeItem.js'


export default {
    name: 'twitchChatComponent',
    mixins: [resizeItem, inputListener],
    componentNumber: -1,
    data () {
        this.$store.commit('addTwitchChatComponent')
        this.componentNumber = this.$store.state.componentCounts.twitchChat - 1
        return {
            msg: 'Welcome to the social media aggregator!',
            twitchSource: 'https://www.twitch.tv/' + this.$store.state.twitchChatComponents[this.componentNumber].twitchChatChannel + '/chat' || 'https://www.twitch.tv/tradechat/chat',
            props: {
                width: 200,
                height: 160
            }
        }
    },

    mounted () {
        const registerListener = (element) => {
            if (!document.getElementById(element)) {
                window.requestAnimationFrame(registerListener)
            } else {
                resizeItem.methods.parentSize('twitchChatWindow' + this.componentNumber, 'twitchChat' + this.componentNumber, 60, 20)
                inputListener.methods.createListener('twitchChatInput' + this.componentNumber, this, this.componentNumber)
            }
        }


        registerListener('twitchChat' + this.componentNumber)
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
