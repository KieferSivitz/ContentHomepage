<template>
    <div class="homeComponent">
        <div class ="homeElement">
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
.homeComponent {
    margin: 20px;
    padding: 20px;
    border: 2px solid #00D8FF;
    background: #DDEEFF;
}

.homeElement {
    display:  flex;
    justify-content: space-around;
}

</style>
