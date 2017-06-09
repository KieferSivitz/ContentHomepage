// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import twitterComponent from './components/twitterComponent'
import twitchComponent from './components/twitchComponent'
import gridComponent from './components/gridComponent'
import twitchChatComponent from './components/twitchChatComponent'
import adsenseComponent from './components/adsenseComponent'
import router from './router'
import Vuex from 'vuex'

// Vuex State Management
Vue.use(Vuex)

if (!localStorage.getItem('layout')) {
    let tmpLayout = [{'x': 0, 'y': 0, 'w': 3, 'h': 20, 'i': 'twitterComponent', 'id': 'gridComponent0'},
    {'x': 6, 'y': 0, 'w': 6, 'h': 12, 'i': 'twitchComponent', 'id': 'gridComponent1'},
    {'x': 3, 'y': 0, 'w': 3, 'h': 20, 'i': 'twitchChatComponent', 'id': 'gridComponent2'}]
    localStorage.setItem('layout', tmpLayout)
}

const store = new Vuex.Store({
    // State variables
    state: {
        gridItems: ['twitterComponent', 'twitchComponent', 'twitchChatComponent'],
        count: 0,
        gridLayout: localStorage.getItem('layout')
    },
    // State modification functions, behave like getters and setters would, accessing essentially private variables
    mutations: {
        increment (state) {
            state.count++
        },
        decrement (state) {
            state.count--
        },
        saveLayout (state, currentLayout) {
            let layoutSaved = currentLayout
            localStorage.setItem('layout', JSON.stringify(layoutSaved))
        }
    }
})

store.commit('increment')

store.commit('decrement')
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

Vue.component({
    el: '#twitterComponent',
    router,
    template: '<twitterComponent/>',
    components: {
        'twitterComponent': twitterComponent
    }
})

Vue.component({
    el: '#twitchComponent',
    router,
    template: '<twitchComponent/>',
    components: {
        'twitchComponent': twitchComponent
    }
})

Vue.component({
    el: '#twitchChatComponent',
    router,
    template: '<twitchChatComponent/>',
    components: {
        'twitchChatComponent': twitchChatComponent
    }
})

Vue.component({
    el: '#adsenseComponent',
    router,
    template: '<adsenseComponent/>',
    components: {
        'adsenseComponent': adsenseComponent
    }
})

Vue.component({
    el: '#gridComponent',
    router,
    template: '<gridComponent/>',
    components: {
        'gridComponent': gridComponent
    }
})
