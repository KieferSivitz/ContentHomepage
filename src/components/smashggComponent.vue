<template>
    <div class="smashggComponent" :id="'smashgg' + componentNumber">
        <input type="text" class="gridInput smashggInput" :id="'smashggInput' + componentNumber" placeholder="Chat Channel" v-model="chatChannel"></input>
        <div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'smashggComponent',
    data () {
        const index = this.$store.state.componentIndexes.smashgg
        this.$store.commit('addSmashggComponent', this._uid)
        return {
            chatChannel: '',
            componentNumber: index
        }
    },

    mounted () {
        const registerListener = (element) => {
            if (!document.getElementById(element)) {
                window.requestAnimationFrame(registerListener)
            } else {
                // Initialize
            }
        }

        // registerListener('smashgg' + this.componentNumber)
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
</style>
