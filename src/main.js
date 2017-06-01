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

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
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
