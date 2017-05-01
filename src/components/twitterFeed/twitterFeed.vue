<template>
  <div class="twitterFeed">
    <!--<a class="twitter-timeline"
      href="https://twitter.com/TSM_Leffen">
    </a>-->
    <div id="twitter-feed">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Welcome to twitter!',
    }
  },



  beforeMount () {
    window.twttr = (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0],
        t = window.twttr || {};
      if (d.getElementById(id)) return t;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://platform.twitter.com/widgets.js";
      fjs.parentNode.insertBefore(js, fjs);

      t._e = [];
      t.ready = function(f) {
        t._e.push(f);
      };

      return t;
    }(document, "script", "twitter-wjs"));

    document.getElementById('twitter-wjs').addEventListener('load', function() {
      twttr.ready(function (twttr) {
        window.twttr.widgets.createTimeline(
          {
            sourceType: 'list',
            ownerScreenName: 'KieferSivitz',
            slug: 'Smash'
          },
          document.getElementById('twitter-feed')
        )
      })
    })
  },

  mounted () {
    this.createFeed;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./twitterFeed.css"></style>
