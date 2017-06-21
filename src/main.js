import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
var defaultConfigs = require('./configuration/layouts.json')

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        // Layout
        gridLayout: JSON.parse(localStorage.getItem('layout')) || defaultConfigs.defaultLayout,

        // Twitch
        twitchChannel: 'tradechat',
        twitchPlayer: {},

        // Twitch Chat
        twitchChatChannel: 'tradechat',

        // Twitter
        twitterUser: 'KieferSivitz',
        twitterList: 'Smash',

        // Inputs
        displayInputs: false
    },
    mutations: {
        // Inputs
        displayInputs (state) {
            state.displayInputs = true
        },
        hideInputs (state) {
            state.displayInputs = false
        },
        // Layouts
        saveLayout (state, newLayout) {
            state.gridLayout = newLayout
            localStorage.setItem('layout', JSON.stringify(newLayout))
        },
        // Twitch
        changeTwitchChannel (state, channel) {
            state.twitchChannel = channel
            state.twitchPlayer.setChannel(channel)
        },
        storeTwitchPlayer (state, t) {
            state.twitchPlayer = t
        },
        // Twitch Chat
        changeTwitchChatChannel (state, channel) {
            document.getElementById('twitchChat').setAttribute('src', 'https://www.twitch.tv/' + channel + '/chat')
            state.twitchChannel = channel
        },
        // Twitter
        changeTwitterFeed (state, info) {
            const oldTwitter = document.querySelector('iframe[id^="twitter-widget-"]')
            const twitterContainer = document.getElementById('gridComponent0').getBoundingClientRect()

            const twitterHeightOffset = (twitterContainer.width >= 515) ? 60 : 100
            state.twitterList = info.list
            state.twitterUser = info.user
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
        navigationActions ({ commit }, info = {twitch: 'tradechat', twitter: {user: 'KieferSivitz', list: 'WoW'}}) {
            commit('changeTwitterFeed', info.twitter)
            commit('changeTwitchChannel', info.twitch)
            commit('changeTwitchChatChannel', info.twitch)
        },
        resizeEvents ({ commit }, info) {
            function resizeWithContainer (newH, newW, newWPx, newHPx, element, offsetW, offsetH) { // eslint-disable-line
                const width = Number(newWPx) - offsetW
                const height = Number(newHPx) - offsetH

                document.getElementById(element).width = width
                document.getElementById(element).height = height
            }
            const newH = info.newH
            const newW = info.newW
            const newWPx = info.newWPx
            const newHPx = info.newHPx

            commit('saveLayout', info.layout)
            switch (info.i) {
            case 'twitchComponent':
                resizeWithContainer(newH, newW, newWPx, newHPx, 'twitchPlayer', 20, 70)
                break;

            case 'twitterComponent':
                const twitterWindow = document.querySelector('iframe[id^="twitter-widget-"]')
                const twitterHeightOffset = (newWPx >= 515) ? 60 : 100
                twitterWindow.style.height = String((newHPx - twitterHeightOffset) + 'px')
                break;

            case 'twitchChatComponent':
                resizeWithContainer(newH, newW, newWPx, newHPx, 'twitchChat', 20, 75)
                break;

            default:
                break;
            }
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
