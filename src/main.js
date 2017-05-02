// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import twitterFeed from './components/twitterFeed'
// import streamComponent from './components/streamComponent'
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
    el: '#twitterFeed',
    router,
    template: '<twitterFeed/>',
    components: {
        'twitterFeed': twitterFeed
    }
})
