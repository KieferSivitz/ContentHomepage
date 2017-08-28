import Vue from 'vue'
import Router from 'vue-router'
import homeComponent from '@/components/homeComponent'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'homeComponent',
            component: homeComponent,
            props: {game: 'Melee'}
        },
        {
            path: '/Smash4',
            name: 'homeComponent',
            component: homeComponent,
            props: {game: 'Smash4'}
        }
    ]
})
