<template>
  <div id="app">
      <div class="nav" id="navbar">
          <ul>
            <li id="iconLi"><a href="#" class="active" id="icon"> <img src="./assets/icon.png"></img></a></li>
            <li><a href="#">VGBootCamp</a></li>
            <li><a href="#" id="navCustom">Custom</a></li>
        </ul>
      </div>
    <router-view>
    </router-view>
  </div>
</template>

<script>
var defaultHubs = require('./configuration/hubs.json')

var $ = require('jquery')
export default {
    name: 'app',
    data () {
        return {
            msg: 'Welcome to the social media aggregator!'
        }
    },
    beforeMount () {
        let game = 'Super Smash Bros. for Wii U'
        $.ajax({
            type: 'GET',
            url: 'https://api.twitch.tv/kraken/streams?game=' + game + '&limit=10',
            headers: {'Client-ID': 'uo6dggojyb8d6soh92zknwmi5ej1q2'},
            success: function (data) {
                console.log([...data.streams])
            }
        });
    },
    mounted () {
        // Iterate through list adding listners
        $(document).ready(function () {
            $('.nav li a').click(function (e) {
                $('.nav li').removeClass('active');

                const $parent = $(this).parent();
                if (!$parent.hasClass('active')) {
                    $parent.addClass('active');
                }
                e.preventDefault();
            });
        });

        // All Listeners for Navigation
        const nums = document.getElementById('navbar');
        let listItem = [...nums.getElementsByTagName('li')] // '...' spreads array like object into array, allows .forEach

        listItem.forEach((item, index) => {
            item.addEventListener('click', (e) => {
                const hub = defaultHubs.hubList.Smash[index - 1]
                this.$store.dispatch('navigationActions', {
                    twitch: {
                        channel: hub.twitchChannel,
                        component: this.$store.state.twitchComponents[0].twitchComponentIndex
                    },
                    twitter: {
                        user: 'KieferSivitz',
                        list: hub.twitterList,
                        componentID: this.$store.state.twitterComponents[0].UID,
                        componentNumber: this.$store.state.twitterComponents[0].twitterComponentIndex
                    }
                })
            })
        })
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
