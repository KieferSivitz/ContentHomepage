export default {
    methods: {
        parentSize: function (rootElement, childElement, heightPadding, widthPadding) {
            const root = document.getElementById(rootElement)
            let container = document.getElementById(childElement).parentNode.getBoundingClientRect()
            let newheight = Number(container.height) - heightPadding;
            let newwidth = Number(container.width) - widthPadding

            window.addEventListener('DOMContentLoaded', () => {
                container = document.getElementById(childElement).parentNode.getBoundingClientRect()
                newheight = Number(container.height) - heightPadding;
                newwidth = Number(container.width) - widthPadding
                root.height = newheight
                root.width = newwidth
                root.style.visibility = 'visible'
            })

            window.addEventListener('resize', () => {
                root.height = newheight
                root.width = newwidth
            })
        }
    }
}
