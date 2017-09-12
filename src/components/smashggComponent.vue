<template>
    <div class="smashggComponent" :id="'smashgg' + componentNumber">
        <input type="text" class="gridInput smashggInput" :id="'smashggInput' + componentNumber" placeholder="Chat Channel" v-model="chatChannel"></input>
        <div class="smashggContainer">
            {{ this.smashggData }}
        </div>
    </div>
</template>

<script>
var $ = require('jquery')
export default {
    name: 'smashggComponent',
    data () {
        const index = this.$store.state.componentIndexes.smashgg
        this.$store.commit('addSmashggComponent', this._uid)
        return {
            chatChannel: '',
            componentNumber: index,
            smashggData: ''
        }
    },
    beforeMount () {
    },
    mounted () {
        $.ajax({
            url: 'https://api.smash.gg/tournament/pulsar-premier-league?expand[]=event&expand[]=phase',
            dataType: 'JSONP',
            type: 'GET',
            success: (data) => {
                console.log('hi')
                console.log(data)
            },
            error: function () {
                console.log('Error')
            }
        });
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.smashggComponent {
    margin: 10px;
}

.input-descriptor {
    line-height: 1.6em;
}

input {
    display: none;
    position: absolute;
    left: 25%;
    width: 50%
}

.smashggContainer {
    background: white;
}

.smashggComponent {
    background: white;
    min-height: 90%;
    max-height: 100%;
    max-width: 100%;
}
</style>
