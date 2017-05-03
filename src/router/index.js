import Vue from 'vue'
import Router from 'vue-router'
import twitchComponent from '@/components/twitchComponent'
import twitterComponent from '@/components/twitterComponent'
import homeComponent from '@/components/homeComponent'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'homeComponent',
            component: homeComponent
        },
        {
            path: '/twitter',
            name: 'twitterComponent',
            component: twitterComponent
        },
        {
            path: '/twitchComponent',
            name: 'twitchComponent',
            component: twitchComponent
        }
    ]
})
