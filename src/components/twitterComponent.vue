<template>
    <div :id="'twitterComponent' + _uid" class="twitterComponent">
        <input type="text" class="gridInput" :id="'twitterUserInput' + _uid" value="Twitter Username"></input>
        <input type="text" class="gridInput" :id="'twitterListInput' + _uid" value="Twitter List"></input>
        <div :id="'twitter-feed-' + componentNumber">
        </div>
    </div>
</template>

<script>
window.twttr = require('../vendor/twitter.js')
export default {
    name: 'twitterComponent',
    data () {
        this.$store.commit('addTwitterComponent', this._uid)
        return {
            msg: 'Welcome to twitter!',
            componentNumber: this.$store.state.componentCounts.twitter - 1
        }
    },

    methods: {
        inputListener: (e, _this) => {
            if (e.keyCode === 13) {
                const text = e.target.value
                _this.$store.commit('changeTwitterFeed', {
                    user: _this.$store.state.twitterComponents[_this.componentNumber].twitterUser,
                    list: text,
                    componentID: _this._uid,
                    componentNumber: this.componentNumber
                })
            }
        }
    },
    mounted () { // For dynamically created components
        const registerListener = (element) => {
            if (!document.getElementById(element).parentNode) {
                window.requestAnimationFrame(registerListener)
            } else {
                this.$store.commit('changeTwitterFeed', {
                    user: this.$store.state.twitterComponents[this.componentNumber].twitterUser,
                    list: this.$store.state.twitterComponents[this.componentNumber].twitterList,
                    componentID: this._uid,
                    componentNumber: this.componentNumber
                })
            }
        }

        document.getElementById('twitter-wjs').addEventListener('load', () => {
            this.$store.commit('changeTwitterFeed', {
                user: this.$store.state.twitterComponents[this.componentNumber].twitterUser,
                list: this.$store.state.twitterComponents[this.componentNumber].twitterList,
                componentID: this._uid,
                componentNumber: this.componentNumber
            })
        })

        registerListener('twitterComponent' + this._uid)

        document.getElementById('twitterUserInput' + this._uid).addEventListener('keydown', (e) => {
            this.inputListener(e, this)
        })
        document.getElementById('twitterListInput' + this._uid).addEventListener('keydown', (e) => {
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
