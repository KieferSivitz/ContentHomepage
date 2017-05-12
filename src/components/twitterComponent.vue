<template>
    <div id= "twitterComponent" class="twitterComponent">
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



    beforeMount () {
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

        document.getElementById('twitter-wjs').addEventListener('load', function () {
            twttr.ready(function (twttr) { // eslint-disable-line
                window.twttr.widgets.createTimeline(
                    {
                        sourceType: 'list',
                        ownerScreenName: 'KieferSivitz',
                        slug: 'Smash'
                    },
                    document.getElementById('twitter-feed'),
                    {
                        height: (window.innerHeight * 0.57),
                        related: 'twitterdev,twitterapi'
                    }
                )
            })
        })
    },

    mounted () {
        document.getElementById('twitter-widget-0').style.height = String((document.getElementById('gridComponent0').innerHeight - 40) + 'px')
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.twitterComponent {
    padding: 10px;
}


</style>
