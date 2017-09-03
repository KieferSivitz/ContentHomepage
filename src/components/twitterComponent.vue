<template>
    <div :id="'twitterComponent' + componentNumber" class="twitterComponent">
        <form v-on:submit="changeFeed()">
            <input type="text" :id="'twitterListInput' + componentNumber" class="gridInput twitterInput" placeholder="Twitter List" v-model="twitterList"></input>
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
        const index = this.$store.state.componentIndexes.twitter
        this.$store.commit('addTwitterComponent', this._uid)
        return {
            initialized: 0,
            twitterUser: 'ContentHomepage',
            twitterList: '',
            componentNumber: index,
            twitterNumber: this.$store.state.twitterComponents.length - 1
        }
    },

    methods: {
        changeFeed () {
            event.preventDefault()
            const twitterIndex = this.$store.state.twitterComponents.findIndex(it => it.twitterComponentIndex === this.componentNumber)
            this.$store.commit('changeTwitterFeed', {
                user: this.$store.state.twitterComponents[twitterIndex].twitterUser,
                list: this.twitterList,
                componentID: this._uid,
                componentNumber: this.componentNumber
            })
        }
    },
    mounted () { // For dynamically created components
        const registerListener = (element) => {
            if (!document.getElementById(element).parentNode) {
                window.requestAnimationFrame(registerListener)
            } else {
                this.$store.commit('changeTwitterFeed', {
                    user: this.$store.state.twitterComponents[this.twitterNumber].twitterUser,
                    list: this.$store.state.twitterComponents[this.twitterNumber].twitterList,
                    componentID: this._uid,
                    componentNumber: this.componentNumber
                })
            }
        }

        if (this.$store.state.componentIndexes.twitter === 1) {
            document.getElementById('twitter-wjs').addEventListener('load', () => {
                this.$store.commit('changeTwitterFeed', {
                    user: this.$store.state.twitterComponents[this.twitterNumber].twitterUser,
                    list: this.$store.state.currentGame,
                    componentID: this._uid,
                    componentNumber: this.componentNumber
                })
            })
        } else {
            registerListener('twitterComponent' + this.componentNumber)
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.twitterComponent {
    padding: 8px;
}

input {
    display: none;
    position: absolute;
    left: 25%;
    width: 50%
}


</style>
