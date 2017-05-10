<template>
    <div class="homeComponent">
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
            <grid-item class="gridItems" v-bind:id="item.id" v-for="item in layout"
                       :x="item.x"
                       :y="item.y"
                       :w="item.w"
                       :h="item.h"
                       :i="item.i"
                        @resized="resizedEvent">
                    <component :is="item.i"></component>
            </grid-item>
            </grid-layout>
        </div>
    </div>
</template>

<script>
import twitterComponent from './twitterComponent'
import twitchComponent from './twitchComponent'
import VueGridLayout from 'vue-grid-layout'

var GridLayout = VueGridLayout.GridLayout;
var GridItem = VueGridLayout.GridItem;

export default {
    name: 'homeComponent',
    components: {
        twitterComponent,
        twitchComponent,
        GridLayout,
        GridItem
    },
    data () {
        return {
            msg: 'Welcome to the social media aggregator!',
            layout: [
                {'x': 0, 'y': 0, 'w': 3, 'h': 40, 'i': 'twitterComponent', 'id': 'gridComponent0'},
                {'x': 3, 'y': 0, 'w': 9, 'h': 30, 'i': 'twitchComponent', 'id': 'gridComponent1'},
                {'x': 3, 'y': 0, 'w': 9, 'h': 10, 'i': 'gridComponent2', 'id': 'gridComponent2'}
            ],
            resizedEvent: function (i, newH, newW, newHPx, newWPx) {
                let width = Number(newHPx) - 40
                let height = width * (9 / 16)

                document.getElementById('twitchPlayer').width = width
                document.getElementById('twitchPlayer').height = height
            }
        }
    },

    mounted () {
    }



}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.componentContainer {
    display:  flex;
    justify-content: space-around;
}

.homeComponent {
    background: #0ff
}

.gridItems {
    background: white;
}

</style>
