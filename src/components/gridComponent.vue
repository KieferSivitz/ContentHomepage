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
                            v-for="item in layout"
                            v-bind:key="item.id"
                        :x="item.x"
                        :y="item.y"
                        :w="item.w"
                        :h="item.h"
                        :i="item.i"
                            @resized="resizedEvent">
                        <button class="delete" v-on:click="removeGridItem(item.id)">X</button>
                        <component :is="item.componentType"></component>
                </grid-item>
            </grid-layout>
            <div>
                <button class="add">
                    <img src="../assets/Twitter_Logo_Blue/Twitter_Logo_Blue.svg" type="image/svg+xml" class="addIcon"></img>
                </button>
                <button class="add" v-on:click="addTwitchComponent">
                    <img src="../assets/twitch.svg" type="image/svg+xml" class="addIcon"></img>
                </button>
                <button class="add" v-on:click="addTwitchChatComponent">
                    <img src="../assets/chat.svg" type="image/svg+xml" class="addIcon"></img>
                </button>
            </div>
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
            const registerListener = () => {
                if (!document.getElementById('#twitchComponent' + twitchComponentCount)) {
                    window.requestAnimationFrame(registerListener)
                } else {
                    new Vue().$mount('#twitchComponent' + twitchComponentCount)
                }
            }

            this.$store.commit('addTwitchItem', 'vgbootcamp')


            registerListener()

            this.layout = this.$store.state.gridLayout
            localStorage.setItem('layout', JSON.stringify(this.layout))
        },
        addTwitchChatComponent: function () {
            const twitchChatComponentCount = (this.$store.state.componentCounts.twitchChat)
            const registerListener = () => {
                if (!document.getElementById('#twitchChatComponent' + twitchChatComponentCount)) {
                    window.requestAnimationFrame(registerListener)
                } else {
                    new Vue().$mount('#twitchChatComponent' + twitchChatComponentCount)
                }
            }

            this.$store.commit('addTwitchChatItem', 'vgbootcamp')


            registerListener()

            this.layout = this.$store.state.gridLayout
            localStorage.setItem('layout', JSON.stringify(this.layout))
        },
        removeGridItem: function (componentID) {
            for (var i = 0; i < this.$store.state.gridLayout.length; ++i) {
                if (this.$store.state.gridLayout[i].id === componentID) {
                    this.$store.dispatch('removeGridItem', i)
                    break
                }
            }
            localStorage.setItem('layout', JSON.stringify(this.layout))
        },
        resizeWithContainer: function (newH, newW, newWPx, newHPx, element, offsetW, offsetH) { // eslint-disable-line
            const width = Number(newWPx) - offsetW
            const height = Number(newHPx) - offsetH

            document.getElementById(element).width = width
            document.getElementById(element).height = height
        },

        resizedEvent: function (i, newH, newW, newWPx, newHPx) {
            this.storeItemProperties()
            switch (true) {
            case i.includes('twitchChat'):
                const chatNumber = i.charAt(i.length - 1)
                this.resizeWithContainer(newH, newW, newWPx, newHPx, 'twitchChatWindow' + chatNumber, 20, 75)
                break;

            case i.includes('twitch'):
                const streamNumber = i.charAt(i.length - 1)
                this.resizeWithContainer(newH, newW, newWPx, newHPx, this.$store.state.twitchComponents[streamNumber].twitchElement, 20, 70)
                break;

            case i.includes('twitter'):
                const twitterWindow = document.querySelector('iframe[id^="twitter-widget-"]')
                let twitterHeightOffset = (newWPx >= 515) ? 60 : 100
                twitterWindow.style.height = String((newHPx - twitterHeightOffset) + 'px')
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
    width: 32px;
    height: 32px;
    border: none;
    background: #4A484C;
}

.delete {
    float: right;
}

.addIcon {
    max-width: 100%;
}

.add {
    background-color: white;
    width: 32px;
    height: 32px;
    border: none;
}


</style>
