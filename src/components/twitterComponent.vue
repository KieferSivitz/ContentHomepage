<template>
    <div id="twitterComponent" class="twitterComponent">
        <input type="text" class="gridInput" id="twitterUserInput" value="Twitter Username"></input>
        <input type="text" class="gridInput" id="twitterListInput" value="Twitter List"></input>
        <div id="twitter-feed">
        </div>
    </div>
</template>

<script>
window.twttr = require('../vendor/twitter.js')
export default {
    name: 'twitterComponent',
    data () {
        return {
            msg: 'Welcome to twitter!'
        }
    },

    methods: {
        createTimeline: (twitterUser, listName, _this) => {
            _this.$store.commit('changeTwitterFeed', {user: twitterUser, list: listName})
        },
        inputListener: (e, _this) => {
            if (e.keyCode === 13) {
                const text = e.target.value
                _this.$store.commit('changeTwitterFeed', {user: _this.$store.state.twitterUser, list: text})
            }
        }
    },
    mounted () {
        const _this = this;
        document.getElementById('twitter-wjs').addEventListener('load', function () {
            _this.$store.commit('changeTwitterFeed', {user: _this.$store.state.twitterUser, list: _this.$store.state.twitterList})
        })
        // Listener for user changing
        document.getElementById('twitterUserInput').addEventListener('keydown', function (e) {
            _this.inputListener(e, _this)
        })
        // Listener for list changing
        document.getElementById('twitterListInput').addEventListener('keydown', function (e) {
            _this.inputListener(e, _this)
        })
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.twitterComponent {
    padding: 10px;
}


</style>
