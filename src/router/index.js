import Vue from 'vue'
import Router from 'vue-router'
import streamComponent from '@/components/streamComponent/streamComponent'
import twitterFeed from '@/components/twitterFeed/twitterFeed'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'streamComponent',
      component: streamComponent
    },
    {
      path: '/twitter',
      name: 'twitterFeed',
      component: twitterFeed
    }
  ]
})
