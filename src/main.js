// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
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
    // Load default layout and store it
    tmpLayout = defaultConfigs.defaultLayout
    localStorage.setItem('layout', JSON.stringify(tmpLayout))
} else {
    // Load user layout
    tmpLayout = JSON.parse(localStorage.getItem('layout'))
}

const store = new Vuex.Store({
    // State variables
    state: {
        gridLayout: tmpLayout,
        twitchChannel: 'tradechat',
        twitchChatChannel: 'tradechat',
        twitterUser: 'kiefersivitz',
        twitterList: 'Smash'
    },
    // State modification functions, behave like getters and setters would, accessing essentially private variables
    mutations: {
        modifyLayout (state, newLayout) {
            state.gridLayout = newLayout
        },
        saveLayout (state, currentLayout) {
            let layoutSaved = currentLayout
            localStorage.setItem('layout', JSON.stringify(layoutSaved))
        },
        smashLayout (state) {
            state.gridLayout = defaultConfigs.smashLayout
            localStorage.setItem('layout', JSON.stringify(state.gridLayout))
        },
        changeTwitchChannel (state, channel) {
            state.twitchChannel = channel
            localStorage.setItem('twitchChannel', channel)
            state.twitchPlayer.setChannel(channel)
        },
        changeTwitterUser (state, user) {
            state.twitterUser = user
            localStorage.setItem('twitterUser', user)
        },
        changeTwitterList (state, list) {
            state.twitterList = list
            localStorage.setItem('twitterList', list)
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
