<template>
    <div class="componentContainer">
        <div class="page-title">
            <h1>
                Welcome to the Content Aggregator!
            </h1>
            <h3>
                Currently combining Twitch and Twitter for Super Smash Brothers Melee!
            </h3>
        </div>
        <gridComponent />
        <div class="page-title">
            <h5>
                More sites and functionality coming in the near future! (Twitch chat, personalized twitter feed, twitch channel options)
            </h5>
        </div>
    </div>
</template>

<script>
import gridComponent from './gridComponent'

export default {
    name: 'homeComponent',
    components: {
        gridComponent
    },
    data () {
        return {
            msg: 'Welcome to the social media aggregator!'

        }
    }



}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
