import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
var defaultConfigs = require('./configuration/layouts.json')
// Vuex State Management
Vue.use(Vuex)

// Check localstorage for a layout, otherwise use the default
let tmpLayout = []
if (!localStorage.getItem('layout')) {
    tmpLayout = [{'x': 0, 'y': 0, 'w': 3, 'h': 20, 'i': 'twitterComponent', 'id': 'gridComponent0'},
    {'x': 6, 'y': 0, 'w': 6, 'h': 12, 'i': 'twitchComponent', 'id': 'gridComponent1'},
    {'x': 3, 'y': 0, 'w': 3, 'h': 20, 'i': 'twitchChatComponent', 'id': 'gridComponent2'}]
    localStorage.setItem('layout', JSON.stringify(tmpLayout))
} else {
    tmpLayout = JSON.parse(localStorage.getItem('layout'))
}

const store = new Vuex.Store({
    // State variables
    state: {
<<<<<<< HEAD
        count: 0,
        gridLayout: tmpLayout
=======
        gridLayout: JSON.parse(localStorage.getItem('layout')) || defaultConfigs.defaultLayout,
        twitchChannel: 'tradechat',
        twitchChatChannel: 'tradechat',
        twitterUser: 'KieferSivitz',
        twitterList: 'Smash'
>>>>>>> state
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
<<<<<<< HEAD
        saveLayout (state, currentLayout) {
            let layoutSaved = currentLayout
            localStorage.setItem('layout', JSON.stringify(layoutSaved))
        }
    }
})
store.commit('increment')
=======
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
>>>>>>> state
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
