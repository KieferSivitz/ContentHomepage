<template>
    <div class="gridComponent">
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
                {'x': 0, 'y': 0, 'w': 3, 'h': 20, 'i': 'twitterComponent', 'id': 'gridComponent0'},
                {'x': 3, 'y': 0, 'w': 9, 'h': 20, 'i': 'twitchComponent', 'id': 'gridComponent1'}
                // {'x': 3, 'y': 0, 'w': 9, 'h': 30, 'i': 'twitchChatComponent', 'id': 'gridComponent2'}
            ]
        }
    },

    methods: {
        resizeWithContainer: function (i, newH, newW, newWPx, newHPx) { // eslint-disable-line
            let offset = 70
            let width = Number(newWPx) - offset
            let height = width * (9 / 16)

            if (height > Number(newHPx) - offset) {
                height = Number(newHPx) - offset
            }

            document.getElementById('twitchPlayer').width = width
            document.getElementById('twitchPlayer').height = height
        },

        resizedEvent: function (i, newH, newW, newWPx, newHPx) {
            // I know this is the same as the event listener in the twitchComponent but
            // I want to keep the components separate, the grid component deals with
            // The resizing events of the grid items only.
            switch (i) {
            case 'twitchComponent':
                this.resizeWithContainer(i, newH, newW, newWPx, newHPx)
                break;
            case 'twitterComponent':
                document.getElementById('twitter-widget-0').style.height = String((newHPx - 70) + 'px')
                break;
            default:
                // Resizing non twitch components logic goes here / in it's own case
            }
        }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

.gridItems {
    background: #555;
}

</style>
