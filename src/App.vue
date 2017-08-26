<template>
  <div id="app">
      <div class="nav" id="navbar">
          <ul>
            <li id="iconLi"><a v-on:click="home()" class="active" id="icon"> <img src="./assets/icon.png"></img></a></li>
            <li v-for="item in streamList" :key="item.index" :id="'navItem' + item.index">
                <a v-on:click="navigation(item.index)">{{ item.channel }}</a>
            </li>
        </ul>
      </div>
    <router-view>
    </router-view>
  </div>
</template>

<script>

var $ = require('jquery')
export default {
    name: 'app',
    data () {
        return {
            streamList: [{
                channel: 'vgBootcamp'
            }]
        }
    },
    methods: {
        home () {
            this.$store.dispatch('navigationActions', {
                twitch: {
                    channel: 'vgbootcamp',
                    component: this.$store.state.twitchComponents[0].twitchComponentIndex
                }
            })
        },
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
                $('.nav li a').click(function (e) {
                    $('.nav li').removeClass('active');

                    const $parent = $(this).parent();
                    if (!$parent.hasClass('active')) {
                        $parent.addClass('active');
                    }
                    e.preventDefault();
                });
            });
        },
        fetchStreams () {
            let game = 'Super Smash Bros. Melee'
            $.ajax({
                type: 'GET',
                url: 'https://api.twitch.tv/kraken/streams?game=' + game + '&limit=6',
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
        this.fetchStreams()
        setInterval(() => {
            this.fetchStreams()
            console.log('hi')
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

#iconLi {
    height: 20px;
}

#icon img {
    position: absolute;
    left: 10px;
    top: 8px;
}

</style>
