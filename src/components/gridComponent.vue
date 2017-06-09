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
// import adsenseComponent from './adsenseComponent'

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
        // adsenseComponent
    },
    data () {
        return {
            msg: 'Welcome to the social media aggregator!',
            layout: this.$store.state.gridLayout
        }
    },

    methods: {
        resizeWithContainer: function (i, newH, newW, newWPx, newHPx, element, offsetW, offsetH) {
            let width = Number(newWPx) - offsetW
            let height = Number(newHPx) - offsetH

            document.getElementById(element).width = width
            document.getElementById(element).height = height
        },

        resizedEvent: function (i, newH, newW, newWPx, newHPx) {
            // TODO: Calculate input height and stuff here
            switch (i) {
            case 'twitchComponent':
                this.storeItemProperties()
                this.resizeWithContainer(i, newH, newW, newWPx, newHPx, 'twitchPlayer', 20, 70)
                break;

            case 'twitterComponent':
                this.storeItemProperties()
                document.querySelector('iframe[id^="twitter-widget-"]').style.height = String((newHPx - 100) + 'px')
                break;

            case 'twitchChatComponent':
                this.storeItemProperties()
                this.resizeWithContainer(i, newH, newW, newWPx, newHPx, 'twitchChat', 20, 75)
                break;

            default:
                break;
            }
        },

        storeItemProperties: function () {
            this.$store.commit('saveLayout', this.layout)
        }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

.gridItems {
    background: #4A484C;
    border-radius: 5px
}

</style>
