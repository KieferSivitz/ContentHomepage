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
                        <button v-on:click="addTwitchComponent">X</button>
                        <component :is="item.componentType" 
                                    :component-name="item.id"></component>
                </grid-item>
            </grid-layout>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import twitterComponent from './twitterComponent'
import twitchComponent from './twitchComponent'
import VueGridLayout from 'vue-grid-layout'
import resizeItem from '../mixins/resizeItem.js'
import twitchChatComponent from './twitchChatComponent'

var GridLayout = VueGridLayout.GridLayout;
var GridItem = VueGridLayout.GridItem;

export default {
    name: 'gridComponent',
    mixins: [resizeItem],
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
            layout: this.$store.state.gridLayout
        }
    },
    methods: {
        addTwitchComponent: function () {
            const twitchComponentCount = (this.$store.state.componentCounts.twitch)
            const componentCount = this.layout.length

            this.$store.commit('addTwitchItem')
            this.layout = this.$store.state.gridLayout
            localStorage.setItem('layout', JSON.stringify(this.layout))

            if (document.getElementById('streamWindow' + twitchComponentCount)) {
                new Vue({props: 'gridComponent' + componentCount}).$mount('#twitchComponent' + twitchComponentCount) // eslint-disable-line
            } else {
                setTimeout(function () {
                    new Vue({props: 'gridComponent' + componentCount}).$mount('#twitchComponent' + twitchComponentCount)
                }, 2000)  // eslint-disable-line 
                console.log(('twitchPlayer' + twitchComponentCount), 'gridComponent' + componentCount)
            }
        },
        resizeWithContainer: function (newH, newW, newWPx, newHPx, element, offsetW, offsetH) { // eslint-disable-line
            const width = Number(newWPx) - offsetW
            const height = Number(newHPx) - offsetH

            document.getElementById(element).width = width
            document.getElementById(element).height = height
        },

        resizedEvent: function (i, newH, newW, newWPx, newHPx) {
            this.storeItemProperties()
            for (let j = 0; i < this.layout.length; ++j) {
                console.log(this.layout[j].i)
                console.log(this.layout[j].id)
            }
            console.log(i)
            switch (i) {
            case 'twitch0':
                this.resizeWithContainer(newH, newW, newWPx, newHPx, this.$store.state.twitchComponents[0].twitchElement, 20, 70)
                break;

            case 'twitch1':
                this.resizeWithContainer(newH, newW, newWPx, newHPx, this.$store.state.twitchComponents[1].twitchElement, 20, 70)
                break;

            case 'twitch2':
                this.resizeWithContainer(newH, newW, newWPx, newHPx, this.$store.state.twitchComponents[2].twitchElement, 20, 70)
                break;

            case 'twitter0':
                const twitterWindow = document.querySelector('iframe[id^="twitter-widget-"]')
                let twitterHeightOffset = (newWPx >= 515) ? 60 : 100
                twitterWindow.style.height = String((newHPx - twitterHeightOffset) + 'px')
                break;

            case 'twitchChat0':
                this.resizeWithContainer(newH, newW, newWPx, newHPx, 'twitchChat', 20, 75)
                break;

            default:
                break;
            }
        },
        updateLayout: function () {
            // defaultConfigs.smashLayout
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

button {
    top: 16px;
    left: 16px;
    float: right;
    width: 32px;
    height: 32px;
    background: #4A484C;
    border: none;
}

</style>
