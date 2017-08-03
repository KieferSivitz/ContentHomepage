<template>
    <div class="componentContainer">
        <div class="page-title">
        </div>
        <gridComponent :my-layout="savelayout"/>
    </div>
</template>

<script>
import gridComponent from './gridComponent'

export default {
    name: 'homeComponent',
    props: ['myLayout'],
    components: {
        gridComponent
    },
    data () {
        return {
            msg: 'Welcome to your Content Homepage!',
            savelayout: this.$store.state.gridLayout
        }
    }



}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

body {
    padding-bottom: 0.2em;
}

</style>
