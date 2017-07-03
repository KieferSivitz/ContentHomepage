export default {
    methods: {
        initialSize: function (rootElement, gridElement, heightPadding, widthPadding) {
            window.addEventListener('load', () => {
                const root = document.getElementById(rootElement)
                const container = document.getElementById(gridElement).getBoundingClientRect()
                const newheight = Number(container.height) - heightPadding;
                const newwidth = Number(container.width) - widthPadding

                root.height = newheight
                root.width = newwidth
                root.style.visibility = 'visible'
            })

            window.addEventListener('resize', () => {
                const root = document.getElementById(rootElement)
                const container = document.getElementById(gridElement).getBoundingClientRect()
                const newheight = Number(container.height) - heightPadding;
                const newwidth = Number(container.width) - widthPadding

                root.height = newheight
                root.width = newwidth
            })
        }
    }
}
