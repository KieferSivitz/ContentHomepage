import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
var defaultConfigs = require('./configuration/layouts.json')

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        componentCounts: {
            twitch: 0
        },
        // Layout
        gridLayout: JSON.parse(localStorage.getItem('layout')) || defaultConfigs.defaultLayout,

        // Components
        twitchComponents: [{
            twitchChannel: 'tradechat',
            twitchPlayer: {},
            twitchElement: 'twitchPlayer10'
        },
        {
            twitchChannel: 'vgbootcamp',
            twitchPlayer: {},
            twitchElement: 'twitchPlayer14'
        }],

        twitterComponents: [{
            twitterUser: 'KieferSivitz',
            twitterList: 'Smash'
        }],

        twitchChatComponents: [{
            twitchChatChannel: 'tradechat'
        }],

        // Twitch Chat
        twitchChatChannel: 'tradechat',

        // Twitter
        twitterUser: 'KieferSivitz',
        twitterList: 'Smash',

        // Inputs
        displayInputs: false
    },
    mutations: {
        // Counter
        addTwitchComponent (state) {
            ++state.componentCounts.twitch
        },
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
        changeTwitchChannel (state, twitch = {channel: 'tradechat', component: 0}) {
            state.twitchComponents[twitch.component].twitchChannel = twitch.channel
            state.twitchComponents[twitch.component].twitchPlayer.setChannel(twitch.channel)
        },
        storeTwitchPlayer (state, twitch = {player: {}, component: 0}) {
            state.twitchComponents[twitch.component].twitchPlayer = twitch.player
        },
        // Twitch Chat
        changeTwitchChatChannel (state, channel) {
            document.getElementById('twitchChat').setAttribute('src', 'https://www.twitch.tv/' + channel + '/chat')
            state.twitchComponents[0].twitchChannel = channel
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
        navigationActions ({ commit }, info = {twitch: {channel: 'tradechat', component: 0}, twitter: {user: 'KieferSivitz', list: 'WoW'}}) {
            commit('changeTwitterFeed', info.twitter)
            commit('changeTwitchChannel', info.twitch)
            commit('changeTwitchChatChannel', info.twitch.channel)
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
