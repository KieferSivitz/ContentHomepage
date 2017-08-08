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

        componentIndex: 3, // Used to generate component IDs, using current count of component causes reuse of IDs

        // Layout
        gridLayout: JSON.parse(localStorage.getItem('layout')) || defaultConfigs.defaultLayout,
        // gridLayout: defaultConfigs.defaultLayout,

        // Components
        twitchComponents: JSON.parse(localStorage.getItem('twitchComponents')) || [{
            twitchChannel: 'tradechat',
            twitchPlayer: {},
            twitchElement: 'twitchPlayer0',
            UID: -1
        }],

        twitterComponents: [{
            twitterUser: 'KieferSivitz',
            twitterList: 'Smash',
            UID: -1
        }],

        twitchChatComponents: [{
            twitchChatChannel: 'tradechat',
            UID: -1
        }]
    },
    mutations: {
        // Counters TODO: Reduce repitition of these
        addTwitchComponent (state, UID) {
            ++state.componentIndex
            ++state.componentCounts.twitch
            state.twitchComponents[state.componentCounts.twitch - 1].UID = UID
        },
        addTwitterComponent (state, UID) {
            ++state.componentIndex
            ++state.componentCounts.twitter
            state.twitterComponents[state.componentCounts.twitter - 1].UID = UID
        },
        addTwitchChatComponent (state, UID) {
            ++state.componentIndex
            ++state.componentCounts.twitchChat
            state.twitchChatComponents[state.componentCounts.twitchChat - 1].UID = UID
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

            newLayout.push({
                'x': 4,
                'y': 20,
                'w': 3,
                'h': 6,
                'i': 'twitch' + state.componentCounts.twitch,
                'id': 'G' + state.componentIndex,
                'componentType': 'twitchComponent'
            })

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
        addTwitchChatItem (state, channel) {
            let newLayout = state.gridLayout

            newLayout.push({
                'x': 4,
                'y': 20,
                'w': 3,
                'h': 6,
                'i': 'twitchChat' + state.componentCounts.twitchChat,
                'id': 'G' + state.componentIndex,
                'componentType': 'twitchChatComponent'
            })

            state.twitchChatComponents.push({
                twitchChatChannel: channel
            })
        },
        changeTwitchChatChannel (state, info) {
            document.getElementById('twitchChat' + info.id).setAttribute('src', 'https://www.twitch.tv/' + info.channel + '/chat')
            state.twitchComponents[info.id].twitchChannel = info.channel
        },

        // Twitter
        changeTwitterFeed (state, info) {
            const oldTwitter = document.querySelector('#twitter-widget-' + info.componentNumber)
            const twitterContainer = document.getElementById('twitterComponent' + info.componentID).parentNode.getBoundingClientRect()

            let twitterHeightOffset = 50
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
                document.getElementById('twitter-feed-' + info.componentNumber),
                {
                    theme: 'dark',
                    dnt: true,
                    height: twitterContainer.height - twitterHeightOffset
                }
            )
        },
        addTwitterItem (state, info) {
            let newLayout = state.gridLayout

            newLayout.push({
                'x': 4,
                'y': 20,
                'w': 3,
                'h': 8,
                'i': 'twitter' + state.componentCounts.twitter,
                'id': 'G' + state.componentIndex,
                'componentType': 'twitterComponent'
            })

            state.twitterComponents.push({
                twitterUser: info.user,
                twitterList: info.list,
                UID: 8,
                componentNumber: info.componentNumber
            })
        }
    },
    actions: {
        navigationActions ({ commit }, info = {twitch: {channel: 'tradechat', component: 0}, twitter: {user: 'KieferSivitz', list: 'WoW', componentID: 'twitterComponent8', componentNumber: 0}}) {
            commit('changeTwitterFeed', info.twitter)
            commit('changeTwitchChannel', info.twitch)
            commit('changeTwitchChatChannel', {
                channel: info.twitch.channel,
                id: 0
            })
        },

        removeGridItem ({ commit, state }, gridItem) {
            const componentTypeLong = state.gridLayout[gridItem].i
            const componentType = componentTypeLong.substring(0, componentTypeLong.length - 1)
            commit('deleteGridItem', gridItem)

            switch (true) { // Lets you do partial string comparison in switch cases
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
