// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
var defaultConfigs = require('./configuration/layouts.json')
// Vuex State Management
Vue.use(Vuex)

const store = new Vuex.Store({
    strict: true,
    // State variables
    state: {
        gridLayout: JSON.parse(localStorage.getItem('layout')) || defaultConfigs.defaultLayout,
        twitchChannel: 'tradechat',
        twitchChatChannel: 'tradechat',
        twitterUser: 'KieferSivitz',
        twitterList: 'Smash'
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
            let user = info.user
            let list = info.list
            document.querySelector('iframe[id^="twitter-widget-"]').remove()
            window.twttr.widgets.createTimeline(
                {
                    sourceType: 'list',
                    ownerScreenName: user,
                    slug: list
                },
                document.getElementById('twitter-feed'),
                {
                    theme: 'dark',
                    dnt: true,
                    height: document.getElementById('gridComponent0').getBoundingClientRect().height - 100
                }
            )
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
