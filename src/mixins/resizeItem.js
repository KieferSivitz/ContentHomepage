export default {
    methods: {
        parentSize: function (rootElement, childElement, heightPadding, widthPadding) {
            console.log(rootElement, childElement)
            const root = document.getElementById(rootElement)
            let container = document.getElementById(childElement).parentNode.getBoundingClientRect()
            let newheight = Number(container.height) - heightPadding
            let newwidth = Number(container.width) - widthPadding

            setTimeout(() => {
                container = document.getElementById(childElement).parentNode.getBoundingClientRect()
                newheight = Number(container.height) - heightPadding;
                newwidth = Number(container.width) - widthPadding
                root.height = newheight
                root.width = newwidth
                root.style.visibility = 'visible'
            })

            window.addEventListener('resize', () => {
                setTimeout(() => {
                    let container = document.getElementById(childElement).parentNode.getBoundingClientRect()
                    root.height = Number(container.height) - heightPadding
                    root.width = Number(container.width) - widthPadding
                }, 50)
            })
        }
    }
}
