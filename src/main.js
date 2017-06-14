// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'

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
        gridLayout: tmpLayout,
        smashLayout: [{'x': 0, 'y': 12, 'w': 6, 'h': 20, 'i': 'twitterComponent', 'id': 'gridComponent0'},
                        {'x': 0, 'y': 0, 'w': 12, 'h': 12, 'i': 'twitchComponent', 'id': 'gridComponent1'},
                        {'x': 6, 'y': 12, 'w': 6, 'h': 20, 'i': 'twitchChatComponent', 'id': 'gridComponent2'}]
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
            state.gridLayout = store.state.smashLayout
            localStorage.setItem('layout', JSON.stringify(state.gridLayout))
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
