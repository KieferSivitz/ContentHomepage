<template>
    <div class="homeComponent">
        <div class ="componentContainer">
            <twitterComponent />
            <twitchComponent />
        </div>
    </div>
</template>

<script>
import twitterComponent from './twitterComponent'
import twitchComponent from './twitchComponent'

export default {
    name: 'homeComponent',
    components: {twitterComponent, twitchComponent},
    data () {
        return {
            msg: 'Welcome to the social media aggregator!'
        }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.componentContainer {
    display:  flex;
    justify-content: space-around;
}

</style>
