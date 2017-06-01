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
            layout: (() => {
                let tmpLayout = [
                    {'x': 0, 'y': 0, 'w': 3, 'h': 20, 'i': 'twitterComponent', 'id': 'gridComponent0'},
                    {'x': 3, 'y': 0, 'w': 9, 'h': 12, 'i': 'twitchComponent', 'id': 'gridComponent1'},
                    {'x': 3, 'y': 12, 'w': 9, 'h': 8, 'i': 'twitchChatComponent', 'id': 'gridComponent2'}
                ]
                if (localStorage.getItem('layout')) {
                    return JSON.parse(localStorage.getItem('layout'))
                }
                return tmpLayout
            })()

        }
    },

    methods: {
        resizeWithContainer: function (i, newH, newW, newWPx, newHPx, element, offsetW, offsetH) { // eslint-disable-line
            let width = Number(newWPx) - offsetW
            let height = Number(newHPx) - offsetH

            document.getElementById(element).width = width
            document.getElementById(element).height = height
        },

        resizeWithContainerWidescreen: function (i, newH, newW, newWPx, newHPx, element, offsetW, offsetH) { // eslint-disable-line
            let width = Number(newWPx) - 20
            let height = width * (9 / 16)

            if (height > Number(newHPx) - offsetH) {
                height = Number(newHPx) - offsetH
            }

            document.getElementById(element).width = width
            document.getElementById(element).height = height
        },

        resizedEvent: function (i, newH, newW, newWPx, newHPx) {
            // TODO: Calculate input height and stuff here
            switch (i) {
            case 'twitchComponent':
                this.storeItemProperties()
                this.resizeWithContainerWidescreen(i, newH, newW, newWPx, newHPx, 'twitchPlayer', 70, 70)
                break;

            case 'twitterComponent':
                document.querySelector('iframe[id^="twitter-widget-"]').style.height = String((newHPx - 70) + 'px')
                break;

            case 'twitchChatComponent':
                this.storeItemProperties()
                this.resizeWithContainer(i, newH, newW, newWPx, newHPx, 'twitchChat', 20, 100)
                break;

            default:
                break;
            }
        },

        storeItemProperties: function () {
            let layoutSaved = this.layout
            localStorage.setItem('layout', JSON.stringify(layoutSaved))
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
