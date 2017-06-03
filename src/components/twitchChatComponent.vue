<template>
    <div class="twitchChatComponent">
        <span class="input-descriptor" style="color: white;">Change the chat channel: </span><input type="text" id="twitchChatInput"></input>
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
        return {
            msg: 'Welcome to the social media aggregator!',
            twitchSource: 'https://www.twitch.tv/' + localStorage.getItem('twitchChatChannel') + '/chat',
            props: {
                width: 40,
                height: 40
            }
        }
    },

    mounted () {
        resizeItem.methods.hello('twitchChat', 'gridComponent2', 100, 20)
        inputListener.methods.createListener('twitchChatInput', 'twitchChatChannel')
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
