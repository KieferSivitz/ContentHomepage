<template>
    <div class="componentContainer">
        <gridComponent />
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
