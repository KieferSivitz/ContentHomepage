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
                    <button class="add" v-on:click="addTwitchComponent">
                        <img src="../assets/twitch.svg" type="image/svg+xml" class="addIcon"></img>
                    </button>
                </li>
                <li>
                    <button class="add" v-on:click="addTwitchChatComponent">
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
                        :id="item.id"
                            @resized="resizedEvent">
                        <button class="delete" v-on:click="removeGridItem(item.id, item.i)">
                            <img src="../assets/close.svg" type="image/svg+xml" class="expandImg"></img>
                        </button>
                        <button class="expandInput" v-on:click="expandInput(item.i)">
                            <img src="../assets/expand-down.svg" type="image/svg+xml" class="expandImg"></img>
                        </button>
                        <component :is="item.componentType"></component>
                </grid-item>
            </grid-layout>
        </div>
    </div>
</template>

<script>
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
            this.$store.commit('addTwitchItem', 'vgbootcamp')

            this.layout = this.$store.state.gridLayout
            localStorage.setItem('layout', JSON.stringify(this.layout))
        },
        addTwitchChatComponent: function () {
            this.$store.commit('addTwitchChatItem', 'vgbootcamp')

            this.layout = this.$store.state.gridLayout
            localStorage.setItem('layout', JSON.stringify(this.layout))
        },
        addTwitterComponent: function () {
            this.$store.commit('addTwitterItem', {
                user: 'KieferSivitz',
                list: 'smash'
            })

            this.layout = this.$store.state.gridLayout
            localStorage.setItem('layout', JSON.stringify(this.layout))
        },
        removeGridItem: function (componentID) {
            for (var i = 0; i < this.$store.state.gridLayout.length; ++i) {
                if (this.$store.state.gridLayout[i].id === componentID) {
                    this.$store.dispatch('removeGridItem', {
                        gridItem: i,
                        componentIndex: componentID.substring(1, componentID.length)
                    })
                    break
                }
            }
            localStorage.setItem('layout', JSON.stringify(this.layout))
        },
        expandInput: function (componentID) {
            let input = null
            switch (true) {
            case componentID.includes('twitchChat'):
                input = document.querySelector('input.twitchChatInput')
                break;

            case componentID.includes('twitch'):
                input = document.querySelector('input.twitchInput')
                break;

            case componentID.includes('twitter'):
                input = document.querySelector('input.twitterInput')
                break;

            default:
                break;
            }
            if (input.style.display !== 'inline') {
                input.style.display = 'inline'
            } else {
                input.style.display = 'none'
            }
        },
        resizeWithContainer: function (newH, newW, newWPx, newHPx, element, offsetW, offsetH) { // eslint-disable-line
            const width = Number(newWPx) - offsetW
            const height = Number(newHPx) - offsetH

            console.log(element)
            document.getElementById(element).width = width
            document.getElementById(element).height = height
        },

        resizedEvent: function (i, newH, newW, newWPx, newHPx) {
            this.storeItemProperties()
            switch (true) {
            case i.includes('twitchChat'):
                const chatNumber = i.charAt(i.length - 1)
                this.resizeWithContainer(newH, newW, newWPx, newHPx, 'twitchChatWindow' + chatNumber, 20, 55)
                break;

            case i.includes('twitch'):
                const streamNumber = Number(i.charAt(i.length - 1))
                const twitchIndex = this.$store.state.twitchComponents.findIndex(it => it.twitchComponentIndex === streamNumber)
                this.resizeWithContainer(newH, newW, newWPx, newHPx, this.$store.state.twitchComponents[twitchIndex].twitchElement, 20, 50)
                break;

            case i.includes('twitter'):
                // const twitterElement = document.querySelectorAll('#twitter-feed-0 > iframe')[0].id
                const twitterNumber = i.charAt(i.length - 1)
                const twitterWindow = document.getElementById('twitter-widget-' + twitterNumber)
                let twitterHeightOffset = 50
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
    max-width: 100%;
}

.expandInput {
    float: left;
}

.expandImg {
    max-width: 80%;
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
