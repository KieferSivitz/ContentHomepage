import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
var defaultConfigs = require('./configuration/layouts.json')

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        componentCounts: {
            twitch: 0,
            twitter: 0,
            twitchChat: 0
        },
        // Layout
        // gridLayout: JSON.parse(localStorage.getItem('layout')) || defaultConfigs.defaultLayout,
        gridLayout: defaultConfigs.defaultLayout,

        // Components
        twitchComponents: JSON.parse(localStorage.getItem('twitchComponents')) || [{
            twitchChannel: 'tradechat',
            twitchPlayer: {},
            twitchElement: 'twitchPlayer0'
        }],

        twitterComponents: [{
            twitterUser: 'KieferSivitz',
            twitterList: 'Smash',
            UID: 8
        }],

        twitchChatComponents: [{
            twitchChatChannel: 'tradechat'
        }]
    },
    mutations: {
        // Counters TODO: Reduce repitition of these
        addTwitchComponent (state) {
            ++state.componentCounts.twitch
        },
        addTwitterComponent (state, id) {
            ++state.componentCounts.twitter
            state.twitterComponents[state.componentCounts.twitter - 1].UID = id
        },
        addTwitchChatComponent (state) {
            ++state.componentCounts.twitchChat
        },
        removeTwitchComponent (state) {
            --state.componentCounts.twitch
        },
        removeTwitterComponent (state) {
            --state.componentCounts.twitter
        },
        removeTwitchChatComponent (state) {
            --state.componentCounts.twitchChat
        },
        // Layouts
        saveLayout (state, newLayout) {
            state.gridLayout = newLayout
            localStorage.setItem('layout', JSON.stringify(newLayout))
        },
        deleteGridItem (state, itemNumber) {
            state.gridLayout.splice(Number(itemNumber), 1)
        },
        // Twitch
        changeTwitchChannel (state, twitch = {channel: 'tradechat', component: 0}) {
            state.twitchComponents[twitch.component].twitchChannel = twitch.channel
            state.twitchComponents[twitch.component].twitchPlayer.setChannel(twitch.channel)
        },
        storeTwitchPlayer (state, twitch = {player: {}, component: 0}) {
            state.twitchComponents[twitch.component].twitchPlayer = twitch.player
        },
        addTwitchItem (state, channel) {
            let newLayout = state.gridLayout
            let newTwitchComponentsList = state.twitchComponents
            newLayout.push({'x': 4, 'y': 20, 'w': 3, 'h': 6, 'i': 'twitch' + state.componentCounts.twitch, 'id': 'gridComponent' + state.gridLayout.length, 'componentType': 'twitchComponent'})
            newTwitchComponentsList.push(
                {
                    twitchChannel: channel,
                    twitchPlayer: {},
                    twitchElement: 'twitchPlayer' + state.twitchComponents.length
                }
            )
            // localStorage.setItem('twitchComponents', JSON.stringify(newTwitchComponentsList))
        },
        // Twitch Chat
        changeTwitchChatChannel (state, channel) {
            document.getElementById('twitchChat').setAttribute('src', 'https://www.twitch.tv/' + channel + '/chat')
            state.twitchComponents[0].twitchChannel = channel
        },
        // Twitter
        changeTwitterFeed (state, info) {
            const oldTwitter = document.querySelector('iframe[id^="twitter-widget-"]')
            const twitterContainer = document.getElementById(info.componentID).parentNode.getBoundingClientRect()

            const twitterHeightOffset = (twitterContainer.width >= 515) ? 60 : 100
            state.twitterComponents[0].twitterList = info.list
            state.twitterComponents[0].twitterUser = info.user
            if (oldTwitter) {
                oldTwitter.remove()
            }
            window.twttr.widgets.createTimeline(
                {
                    sourceType: 'list',
                    ownerScreenName: info.user,
                    slug: info.list
                },
                document.getElementById('twitter-feed'),
                {
                    theme: 'dark',
                    dnt: true,
                    height: twitterContainer.height - twitterHeightOffset
                }
            )
        }
    },
    actions: {
        navigationActions ({ commit }, info = {twitch: {channel: 'tradechat', component: 0}, twitter: {user: 'KieferSivitz', list: 'WoW', componentID: 'twitterComponent8'}}) {
            commit('changeTwitterFeed', info.twitter)
            commit('changeTwitchChannel', info.twitch)
            commit('changeTwitchChatChannel', info.twitch.channel)
        },
        removeGridItem ({ commit, state }, gridItem) {
            const componentTypeLong = state.gridLayout[gridItem.charAt(gridItem.length - 1)].i
            const componentType = componentTypeLong.substring(0, componentTypeLong.length - 1)
            commit('deleteGridItem', gridItem.charAt(gridItem.length - 1))

            switch (true) {
            case componentType.includes('twitchChat'):
                commit('removeTwitchChatComponent')
                break;

            case componentType.includes('twitch'):
                commit('removeTwitchComponent')
                break;

            case componentType.includes('twitter'):
                commit('removeTwitterComponent')
                break;

            default:
                break;
            }

            // Add vm.$destroy
        }
    }
})


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    router,
    template: '<App/>',
    components: {
        'App': App
    }
})
