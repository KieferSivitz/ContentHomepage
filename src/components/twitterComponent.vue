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
        document.getElementById('twitter-wjs').addEventListener('load', () => {
            this.$store.commit('changeTwitterFeed', {user: this.$store.state.twitterUser, list: this.$store.state.twitterList})
        })
        // Listener for user changing
        document.getElementById('twitterUserInput').addEventListener('keydown', (e) => {
            this.inputListener(e, this)
        })
        // Listener for list changing
        document.getElementById('twitterListInput').addEventListener('keydown', (e) => {
            this.inputListener(e, this)
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
