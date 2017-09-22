<template>
    <div class="componentContainer"> 
        <gridComponent :my-layout="savelayout"/>
        <div>
            If you'd like to contribute to this project or report a bug check it out on <a href="https://github.com/KieferSivitz/ContentHomepage">Github!</a>
        </div>
    </div>
</template>

<script>
import gridComponent from './gridComponent'

export default {
    name: 'homeComponent',
    props: ['game', 'twitchCategory'],
    components: {
        gridComponent
    },
    data () {
        this.$store.commit('storeCurrentGame', {
            game: this.game,
            twitchCategory: this.twitchCategory
        })
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
    padding-bottom: 0.15em;
}

</style>
