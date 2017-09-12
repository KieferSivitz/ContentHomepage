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
            props: {game: 'Melee', twitchCategory: 'Super Smash Bros. Melee'}
        },
        {
            path: '/Smash4',
            name: 'Smash4',
            component: homeComponent,
            props: {game: 'Smash4', twitchCategory: 'Super Smash Bros. for Wii U'}
        },
        {
            path: '/LoL',
            name: 'LoL',
            component: homeComponent,
            props: {game: 'LoL', twitchCategory: 'League of Legends'}
        },
        {
            path: '/PUBG',
            name: 'PUBG',
            component: homeComponent,
            props: {game: 'PUBG', twitchCategory: 'PLAYERUNKNOWN\'S BATTLEGROUNDS'}
        },
        {
            path: '/Hearthstone',
            name: 'Hearthstone',
            component: homeComponent,
            props: {game: 'Hearthstone', twitchCategory: 'Hearthstone'}
        },
        {
            path: '/CSGO',
            name: 'CSGO',
            component: homeComponent,
            props: {game: 'CSGO', twitchCategory: 'Counter-Strike: Global Offensive'}
        },
        {
            path: '/WoW',
            name: 'WoW',
            component: homeComponent,
            props: {game: 'WoW', twitchCategory: 'World of Warcraft'}
        },
        {
            path: '/DotA',
            name: 'DotA',
            component: homeComponent,
            props: {game: 'DotA', twitchCategory: 'Dota 2'}
        },
        {
            path: '/Overwatch',
            name: 'Overwatch',
            component: homeComponent,
            props: {game: 'Overwatch', twitchCategory: 'Overwatch'}
        },
        {
            path: '/StarCraft',
            name: 'StarCraft',
            component: homeComponent,
            props: {game: 'StarCraft', twitchCategory: 'StarCraft'}
        },
        {
            path: '/StarCraft2',
            name: 'StarCraft2',
            component: homeComponent,
            props: {game: 'StarCraft2', twitchCategory: 'StarCraft II'}
        },
        {
            path: '/HotS',
            name: 'HotS',
            component: homeComponent,
            props: {game: 'HotS', twitchCategory: 'Heroes of the Storm'}
        }
    ]
})
