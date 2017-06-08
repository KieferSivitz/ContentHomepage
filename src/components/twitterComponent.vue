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
        if (!localStorage.getItem('twitterUser')) {
            localStorage.setItem('twitterUser', 'KieferSivitz')
        }
        if (!localStorage.getItem('twitterList')) {
            localStorage.setItem('twitterList', 'Smash')
        }

        window.twttr = (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0], t = window.twttr || {}; // eslint-disable-line
            if (d.getElementById(id)) return t;
            js = d.createElement(s);
            js.id = id;
            js.src = 'https://platform.twitter.com/widgets.js';
            fjs.parentNode.insertBefore(js, fjs);

            t._e = [];
            t.ready = function (f) {
                t._e.push(f);
            };

            return t;
        }(document, 'script', 'twitter-wjs'));

        this.createTimeline(localStorage.getItem('twitterUser'), localStorage.getItem('twitterList'))
    },

    mounted () {
        let self = this;
        // Listener for user changing
        document.getElementById('twitterUserInput').addEventListener('keydown', function (e) {
            if (e.keyCode === 13) {
                let text = e.target.value
                self.createTwitterFeed(text, localStorage.getItem('twitterList'))
                localStorage.setItem('twitterUser', text)
            }
        })
        // Listener for list changing
        document.getElementById('twitterListInput').addEventListener('keydown', function (e) {
            if (e.keyCode === 13) {
                let text = e.target.value
                self.createTwitterFeed(localStorage.getItem('twitterUser'), text)
                localStorage.setItem('twitterList', text)
            }
        })

        console.log(this.$store.state.count)
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.twitterComponent {
    padding: 10px;
}


</style>
