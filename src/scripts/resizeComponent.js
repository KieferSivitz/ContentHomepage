function resizeWithContainer (i, newH, newW, newWPx, newHPx) { // eslint-disable-line
    let offset = 70
    let width = Number(newWPx) - offset
    let height = width * (9 / 16)

    if (height > Number(newHPx) - offset) {
        height = Number(newHPx) - offset
    }

    document.getElementById('twitchPlayer').width = width
    document.getElementById('twitchPlayer').height = height
}
