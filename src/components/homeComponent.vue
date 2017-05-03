<template>
    <div class="homePage">
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
    name: 'homePage',
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
.homePage {
    margin: 20px;
    padding: 20px;
    border: 2px solid #00D8FF;
    background: #DDEEFF;
}

.componentContainer {
    display:  flex;
    justify-content: space-around;
}

</style>
