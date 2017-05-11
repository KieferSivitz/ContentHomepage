<template>
    <div class="gridComponent">
        <div id="streamWindow">
            <div class="layout">
                <grid-layout
                    :layout="layout"
                    :col-num="12"
                    :row-height="30"
                    :is-draggable="true"
                    :is-resizable="true"
                    :vertical-compact="true"
                    :margin="[10, 10]"
                    :use-css-transforms="true">
                <grid-item class="gridItems"
                            v-bind:id="item.id"
                            v-for="item in layout"
                            v-bind:key="item.id"
                           :x="item.x"
                           :y="item.y"
                           :w="item.w"
                           :h="item.h"
                           :i="item.i"
                            @resized="resizedEvent">
                        <component :is="item.i" class="componentContainer"></component>
                </grid-item>
                </grid-layout>
            </div>
        </div>
    </div>
</template>

<script>
import twitterComponent from './twitterComponent'
import twitchComponent from './twitchComponent'
import VueGridLayout from 'vue-grid-layout'
import twitchChatComponent from './twitchChatComponent'

var GridLayout = VueGridLayout.GridLayout;
var GridItem = VueGridLayout.GridItem;

export default {
    name: 'gridComponent',
    components: {
        twitterComponent,
        twitchComponent,
        GridLayout,
        GridItem,
        twitchChatComponent
    },
    data () {
        return {
            msg: 'Welcome to the social media aggregator!',
            layout: [
                {'x': 0, 'y': 0, 'w': 3, 'h': 40, 'i': 'twitterComponent', 'id': 'gridComponent0'},
                {'x': 3, 'y': 0, 'w': 9, 'h': 30, 'i': 'twitchComponent', 'id': 'gridComponent1'}
                // {'x': 3, 'y': 0, 'w': 9, 'h': 30, 'i': 'twitchChatComponent', 'id': 'gridComponent2'}
            ],
            resizedEvent: function (i, newH, newW, newWPx, newHPx) {
                let width = Number(newWPx) - 40
                let height = width * (9 / 16)

                if (height > Number(newHPx)) {
                    console.log('conditional')
                    height = Number(newHPx) - 40
                }

                // TODO, resized is tracking every component,
                // changes should only affect changed component

                document.getElementById('twitchPlayer').width = width
                document.getElementById('twitchPlayer').height = height
            }
        }
    },

    methods: {
        renderPlayer: (channelID) => {
            var windowWidth = (document.getElementById('gridComponent1').clientWidth - 40)
            var windowHeight = windowWidth * (9 / 16)
            var target = 'streamWindow'

            var options = {
                width: windowWidth,
                height: windowHeight,
                channel: channelID,
                autoplay: false
            }

            var player = new window.Twitch.Player(target, options)
            player.setVolume(0.5)
        }

    },

    mounted () {
        this.renderPlayer('RiotGames')
        document.getElementById('streamWindow').firstChild.id = 'twitchPlayer'
    }



}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.componentContainer {
    margin: 5px;
}

.gridItems {
    background: white;
}
</style>
