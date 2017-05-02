<template>
    <div class="homePage">
        <div class ="componentContainer">
            <twitterFeed />
            <streamComponent />
        </div>
    </div>
</template>

<script>
import twitterFeed from './twitterFeed'
import streamComponent from './streamComponent'

export default {
    name: 'homePage',
    components: {twitterFeed, streamComponent},
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
