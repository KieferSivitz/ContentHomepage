<template>
    <div class="homeComponent">
        <div class ="componentContainer">
            <twitterComponent />
            <twitchComponent />
            <twitchChatComponent />
        </div>
    </div>
</template>

<script>
import twitterComponent from './twitterComponent'
import twitchComponent from './twitchComponent'
import twitchChatComponent from './twitchChatComponent'

export default {
    name: 'homeComponent',
    components: {twitterComponent, twitchComponent, twitchChatComponent},
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
