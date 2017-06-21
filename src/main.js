import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
var defaultConfigs = require('./configuration/layouts.json')
// Vuex State Management
Vue.use(Vuex)

const store = new Vuex.Store({
    // State variables
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
        changeTwitchChatChannel (state, channel) {
            document.getElementById('twitchChat').setAttribute('src', 'https://www.twitch.tv/' + channel + '/chat')
            state.twitchChannel = channel
        },
        storeTwitchPlayer (state, t) {
            state.twitchPlayer = t
        },
        // Twitter
        changeTwitterFeed (state, info) {
            const oldTwitter = document.querySelector('iframe[id^="twitter-widget-"]')
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
                    height: document.getElementById('gridComponent0').getBoundingClientRect().height - 100
                }
            )
        }
    },
    actions: {
        navigationActions ({ commit }, info = {twitch: 'tradechat', twitter: {user: 'KieferSivitz', list: 'WoW'}}) {
            commit('changeTwitterFeed', info.twitter)
            commit('changeTwitchChannel', info.twitch)
            commit('changeTwitchChatChannel', info.twitch)
        }
    }
})
// End of Vuex Code


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
