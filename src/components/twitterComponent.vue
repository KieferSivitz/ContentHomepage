<template>
    <div :id="'twitterComponent' + _uid" class="twitterComponent">
        <form v-on:submit="changeFeed()">
            <input type="text" class="gridInput twitterInput" :id="'twitterListInput' + _uid" placeholder="Twitter List" v-model="twitterList"></input>
            <!-- <input type="text" class="gridInput twitterInput" :id="'twitterUserInput' + _uid" placeholder="Twitter Username" v-model="twitterUser" required="optional"></input> -->
        </form>
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
            twitterUser: 'KieferSivitz',
            twitterList: '',
            msg: 'Welcome to twitter!',
            componentNumber: this.$store.state.componentCounts.twitter - 1
        }
    },

    methods: {
        changeFeed () {
            event.preventDefault()
            this.$store.commit('changeTwitterFeed', {
                user: this.$store.state.twitterComponents[this.componentNumber].twitterUser,
                list: this.twitterList,
                componentID: this._uid,
                componentNumber: this.componentNumber
            })
        },
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
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.twitterComponent {
    padding: 10px;
}

input {
    display: none;
}


</style>
