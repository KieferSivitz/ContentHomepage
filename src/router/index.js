import Vue from 'vue'
import Router from 'vue-router'
import streamComponent from '@/components/streamComponent'
import twitterFeed from '@/components/twitterFeed'
import homePage from '@/components/homePage'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'homePage',
            component: homePage
        },
        {
            path: '/twitter',
            name: 'twitterFeed',
            component: twitterFeed
        },
        {
            path: '/streamComponent',
            name: 'streamComponent',
            component: streamComponent
        }
    ]
})
