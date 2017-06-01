<template>
    <div class="adsenseComponent">
        <span class="input-descriptor" style="color: white;">Google Adsense will go here</span>
        <div id="adsenseContainer">
        </div>
    </div>
</template>

<script>
import resizeItem from '../mixins/resizeItem.js'

export default {
    name: 'adsenseComponent',
    mixins: [resizeItem],
    data () {
        return {
            msg: 'Welcome to the social media aggregator!',
            props: {
            }
        }
    },

    mounted () {
        // resizeItem.methods.hello('adsenseContainer', 'gridComponent3', 100, 20)
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.adsenseComponent {
    margin: 10px;
}

.input-descriptor {
    line-height: 1.6em;
}
</style>
