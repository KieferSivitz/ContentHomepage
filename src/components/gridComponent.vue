<template>
    <div class="gridComponent">
        <div id="addItem">
            <a id="addButton" href="#">+</a>
            <ul id="creationList">
                <li>
                    <button class="add" v-on:click="addTwitterComponent">
                        <img src="../assets/Twitter_Logo_Blue/Twitter_Logo_Blue.svg" type="image/svg+xml" class="addIcon"></img>
                    </button>
                </li>
                <li>
                    <button class="add" v-on:click="addTwitchComponent" style="padding-bottom: 4px">
                        <img src="../assets/twitch.svg" type="image/svg+xml" class="addIcon"></img>
                    </button>
                </li>
                <li>
                    <button class="add" v-on:click="addTwitchChatComponent" style="padding-top: 6px">
                        <img src="../assets/chat.svg" type="image/svg+xml" class="addIcon"></img>
                    </button>
                </li>
            </ul>
        </div>
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
        // TODO: Combign the below
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
        addTwitterComponent: function () {
            const twitterComponentCount = (this.$store.state.componentCounts.twitter)
            const registerListener = () => {
                if (!document.getElementById('#twitterComponent' + twitterComponentCount)) {
                    window.requestAnimationFrame(registerListener)
                } else {
                    new Vue().$mount('#twitterComponent' + twitterComponentCount)
                }
            }

            this.$store.commit('addTwitterItem', {
                user: 'KieferSivitz',
                list: 'smash'
            })


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
                const twitterNumber = i.charAt(i.length - 1)
                const twitterWindow = document.getElementById('twitter-widget-' + twitterNumber)
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
<style scoped>

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

#addItem {
    width: 250px;
    position: absolute;
    float: right;
    top: 0;
    right: 0;
    padding: 14px 16px;
    height: 32px;
}

#addButton {
    position: absolute;
    float: right;
    top: 0;
    right: 0;
    color: white;
    text-align: center;
    padding: 6px 16px;
    text-decoration: none;
    font-size: 2em;
    font-weight: 400;
}

#creationList {
    margin-top: 38px;
    display: none;
}

#addItem:hover #creationList {
    display: block;
}

#addItem:hover {
    background-color: #4A484C;
    width: 8%;
    height: 97.8%;
    z-index: 999;
}

.delete {
    float: right;
}

.addIcon {
    width: 100%;
    max-height: 100%;
}

.add {
    background-color: white;
    width: 100%;
    height: 80px;
    border: none;
}

ul {
    background-color: #4A484C;
}


</style>
