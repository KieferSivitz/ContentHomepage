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
        gridLayout: JSON.parse(localStorage.getItem('layout')) || defaultConfigs.defaultLayout,
        twitchChannel: 'tradechat',
        twitchChatChannel: 'tradechat',
        twitterUser: 'KieferSivitz',
        twitterList: 'Smash',
        displayInputs: false
    },
    mutations: {
        saveLayout (state, newLayout) {
            state.gridLayout = newLayout
            localStorage.setItem('layout', JSON.stringify(newLayout))
        },
        smashLayout (state) {
            state.gridLayout = defaultConfigs.smashLayout
        },
        changeTwitchChannel (state, channel) {
            state.twitchChannel = channel
        },
        changeTwitchChatChannel (state, channel) {
            document.getElementById('twitchChat').setAttribute('src', 'https://www.twitch.tv/' + channel + '/chat')
            state.twitchChannel = channel
        },
        updateTwitterList (state, list) {
            state.twitterList = list
        },
        updateTwitterUser (state, user) {
            state.twitterUser = user
        },
        changeTwitterFeed (state, info) {
            state.twitterList = info.list
            state.twitterUser = info.user
            const oldTwitter = document.querySelector('iframe[id^="twitter-widget-"]')
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
        },
        displayInputs (state) {
            state.displayInputs = true
        },
        hideInputs (state) {
            state.displayInputs = false
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
