<template>
    <div class="componentContainer">
        <div class="page-title">
        </div>
        <gridComponent />
        <div class="page-title">
            <h5>
                More features coming in the near future!
            </h5>
        </div>
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
            msg: 'Welcome to your Content Homepage!'

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
