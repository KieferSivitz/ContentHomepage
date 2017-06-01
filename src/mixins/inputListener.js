export default {
    mounted: function () {
        // this.hello()
    },
    methods: {
        createListener: function (elementID, action) {
            // Listener for channel changing
            document.getElementById(elementID).addEventListener('keydown', function (e) {
                if (e.keyCode === 13) {
                    let text = e.target.value
                    document.getElementById('twitchChat').setAttribute('src', 'https://www.twitch.tv/' + text + '/chat')
                }
            })
        }
    }
}
