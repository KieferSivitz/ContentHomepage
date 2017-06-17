<template>
    <div id="twitterComponent" class="twitterComponent">
        <span class="input-descriptor" style="color: white;">Use your own twitter list!: </span>
        <br />
        <input type="text" id="twitterUserInput" value="Twitter Username"></input>
        <input type="text" id="twitterListInput" value="Twitter List"></input>
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
        createTwitterFeed: (twitterUser, listName) => {
            document.querySelector('iframe[id^="twitter-widget-"]').remove()
            window.twttr.widgets.createTimeline(
                {
                    sourceType: 'list',
                    ownerScreenName: twitterUser,
                    slug: listName
                },
                document.getElementById('twitter-feed'),
                {
                    theme: 'dark',
                    dnt: true,
                    height: document.getElementById('gridComponent0').getBoundingClientRect().height - 100
                }
            )
        },
        createTimeline: (twitterUser, listName) => {
            document.getElementById('twitter-wjs').addEventListener('load', function () {
                twttr.ready(function (twttr) { // eslint-disable-line
                    window.twttr.widgets.createTimeline(
                        {
                            sourceType: 'list',
                            ownerScreenName: twitterUser,
                            slug: listName
                        },
                        document.getElementById('twitter-feed'),
                        {
                            theme: 'dark',
                            // height: (window.innerHeight * 0.54),
                            height: document.getElementById('gridComponent0').getBoundingClientRect().height - 100
                        }
                    )
                })
            })
        }
    },

    beforeMount () {
        this.createTimeline(this.$store.state.twitterUser, this.$store.state.twitterList)
    },

    mounted () {
        var _this = this;
        // Listener for user changing
        document.getElementById('twitterUserInput').addEventListener('keydown', function (e) {
            if (e.keyCode === 13) {
                let text = e.target.value
                _this.createTwitterFeed(text, _this.$store.state.twitterList)
                _this.$store.commit('updateTwitterUser', text)
            }
        })
        // Listener for list changing
        document.getElementById('twitterListInput').addEventListener('keydown', function (e) {
            if (e.keyCode === 13) {
                let text = e.target.value
                _this.createTwitterFeed(_this.$store.state.twitterUser, text)
                _this.$store.commit('updateTwitterList', text)
            }
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
