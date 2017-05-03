// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import twitterComponent from './components/twitterComponent'
import twitchComponent from './components/twitchComponent'
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
