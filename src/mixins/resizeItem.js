export default {
    mounted: function () {
        // this.hello()
    },
    methods: {
        hello: function (rootElement, gridElement, heightPadding, widthPadding) {
            window.addEventListener('load', () => {
                let root = document.getElementById(rootElement)
                let container = document.getElementById(gridElement).getBoundingClientRect()
                let newheight = Number(container.height) - heightPadding;
                let newwidth = Number(container.width) - widthPadding

                root.height = newheight
                root.width = newwidth
                root.style.visibility = 'visible'
            })
        }
    }
}
