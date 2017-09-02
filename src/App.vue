<template>
  <div id="app">
      <div class="nav" id="navbar">
          <ul>
            <li id="iconLi">
                <a class="active" id="icon"> <img src="./assets/icon.png"></img></a>
                <ul id="gamesList">
                    <li>
                        <h3>Games</h3>
                    </li>
                    <li v-for="item in gamesList" :key="item.route">
                        <a :href="'/' + item.route">{{ item.label }}</a>
                    </li>
                </ul>
            </li>
            <li class="navigationLi" v-for="item in streamList" :key="item.index" :id="'navItem' + item.index" :title="item.viewers + ' Viewers'">
                <a v-on:click="navigation(item.index)">{{ item.channel }}</a>
            </li>
        </ul>
      </div>
    <router-view>
    </router-view>
  </div>
</template>

<script>
var gamesList = require('./configuration/hubs.json')

var $ = require('jquery')
export default {
    name: 'app',
    data () {
        return {
            gamesList: gamesList.games,
            streamList: [{
                channel: 'vgBootcamp'
            }]
        }
    },
    methods: {
        navigation (index) {
            const hub = this.$store.state.streamList[index]
            this.$store.dispatch('navigationActions', {
                twitch: {
                    channel: hub.channel,
                    component: this.$store.state.twitchComponents[0].twitchComponentIndex
                }
            })
        },
        activeTab () {
            // Iterate through list adding listners
            $(document).ready(() => {
                $('.nav li.navigationLi a').click(function (e) {
                    $('.nav li.navigationLi').removeClass('active');

                    const $parent = $(this).parent();
                    if (!$parent.hasClass('active')) {
                        $parent.addClass('active');
                    }
                    e.preventDefault();
                });
            });
        },
        fetchStreams () {
            $.ajax({
                type: 'GET',
                url: 'https://api.twitch.tv/kraken/streams?game=' + this.$store.state.currentTwitchCategory + '&limit=8',
                headers: {'Client-ID': 'uo6dggojyb8d6soh92zknwmi5ej1q2'},
                success: (data) => {
                    let tmpList = [];
                    [...data.streams].forEach((item, index) => {
                        tmpList[index] = {
                            channel: item.channel.display_name,
                            viewers: item.viewers,
                            index: index
                        }
                    })
                    this.$store.commit('saveStreamsList', tmpList)
                    this.streamList = tmpList
                    this.activeTab()
                }
            });
        }
    },
    beforeMount () {
        setTimeout(() => {
            this.fetchStreams()
        }, 10);
        setInterval(() => {
            this.fetchStreams()
        }, 60000);
    }


}
</script>

<style>
html {
    background-color: #334D5C;
    height: 100%;
    margin: 0;
    padding: 0;
}

body {
    background-color: #334D5C;
    margin: 0;
    padding: 0;

}


.page-title {
    text-align: center;
    color: white;
    padding-top: 10px;
}

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    height: 100%;
    background-color: #334D5C;
}


.gridInput {
    position: inherit;
}

input {
    text-align: center;
    margin-bottom: 10px;
    font-size: 1.3rem;
    top: 3px;
    border: 0;
    border-radius: 3px;
    background: #fff;
}


/* N A V B A R */
ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #45B29D;
}

li {
    float: left;
}

li a {
    display: block;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    height: 100%;
    font-weight: 700;
    cursor: pointer;
}

/* Change the link color to #111 (black) on hover */
li a:hover {
    background-color: #111;
}

#navbar {
    overflow: hidden;
}

.active {
    background-color: #334D5C;
}

#icon {
    height: 100%;
    width: 20px;
}

#icon img {
    position: absolute;
    left: 10px;
    top: 8px;
}

#iconLi {
    height: 20px;
}

#gamesList {
    position: absolute;
    float: left;
    top: 0;
    left: 0;
    padding-left: 5px;
    padding-right: 5px;
    width: 0px;
    transition: all 0.65s ease;
    display: none;
}

#gamesList > li {
    width: 100%;
}

#iconLi:hover #gamesList {
    display: block;
    background-color: #4A484C;
    width: 12%;
    transition:  width 0.65s ease;
    height: 100%;
    z-index: 999;
}

button {
    cursor: pointer;
}

</style>
