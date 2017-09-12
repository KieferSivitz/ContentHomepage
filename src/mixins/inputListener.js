export default {
    mounted: function () {
    },
    methods: {
        createListener: function (elementID, _this, chatNumber) {
            // Listener for channel changing
            const input = document.getElementById(elementID)
            input.addEventListener('keydown', function (e) {
                if (e.keyCode === 13) {
                    const text = e.target.value
                    input.style.display = 'none'
                    _this.$store.commit('changeTwitchChatChannel', {id: chatNumber, channel: text})
                }
            })
        }
    }
}
