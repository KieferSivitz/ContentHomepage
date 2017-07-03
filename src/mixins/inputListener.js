export default {
    mounted: function () {
    },
    methods: {
        createListener: function (elementID, _this) {
            // Listener for channel changing
            document.getElementById(elementID).addEventListener('keydown', function (e) {
                if (e.keyCode === 13) {
                    const text = e.target.value
                    document.getElementById('twitchChat').setAttribute('src', 'https://www.twitch.tv/' + text + '/chat')
                    _this.$store.commit('changeTwitchChatChannel', text)
                }
            })
        }
    }
}
