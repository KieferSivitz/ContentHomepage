<template>
    <div class="componentContainer"> 
        <gridComponent :game="this.game" :my-layout="savelayout"/>
    </div>
</template>

<script>
import gridComponent from './gridComponent'

export default {
    name: 'homeComponent',
    props: ['game'],
    components: {
        gridComponent
    },
    data () {
        this.$store.commit('storeCurrentGame', this.game)
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
