<template>
    <div :id="'twitterComponent' + _uid" class="twitterComponent">
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
        this.$store.commit('addTwitterComponent', 'twitterComponent' + this._uid)
        return {
            msg: 'Welcome to twitter!',
            component: this.$store.state.componentCounts.twitter - 1
        }
    },

    methods: {
        createTimeline: (twitterUser, listName) => {
            this.$store.commit('changeTwitterFeed', {
                user: twitterUser,
                list: listName,
                componentID: 'twitterComponent' + this._uid
            })
        },
        inputListener: (e, _this) => {
            if (e.keyCode === 13) {
                const text = e.target.value
                _this.$store.commit('changeTwitterFeed', {
                    user: _this.$store.state.twitterComponents[_this.component].twitterUser,
                    list: text,
                    componentID: 'twitterComponent' + _this._uid
                })
            }
        }
    },
    mounted () {
        document.getElementById('twitter-wjs').addEventListener('load', () => {
            this.$store.commit('changeTwitterFeed', {
                user: this.$store.state.twitterComponents[this.component].twitterUser,
                list: this.$store.state.twitterComponents[this.component].twitterList,
                componentID: 'twitterComponent' + this._uid
            })
        })
        document.getElementById('twitterUserInput').addEventListener('keydown', (e) => {
            this.inputListener(e, this)
        })
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
