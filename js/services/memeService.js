'use strict'

let gFillColor = 'white'
let gStrokeColor = 'black'
let gFontSize = 40
let gFontFamily = 'myImpact'

let gSelectedLineIdx = 0
let gMeme

var gImgs = [
    { id: 2, url: 'img/2.jpg', keywords: ['all', 'square', 'dogs', 'cute'] },
    { id: 1, url: 'img/1.jpg', keywords: ['all', 'square', 'trump', 'man'] },
    { id: 3, url: 'img/3.jpg', keywords: ['all', 'square', 'dogs', 'baby', 'cute', 'mood'] },
    { id: 4, url: 'img/4.jpg', keywords: ['all', 'square', 'cats', 'mood', 'cute'] },
    { id: 5, url: 'img/5.jpg', keywords: ['all', 'square', 'baby', 'mood', 'cute'] },
    { id: 6, url: 'img/6.jpg', keywords: ['all', 'square', 'tv', 'mood', 'man'] },
    { id: 7, url: 'img/7.jpg', keywords: ['all', 'square', 'baby', 'mood'] },
    { id: 8, url: 'img/8.jpg', keywords: ['all', 'square', 'tv', 'man'] },
    { id: 9, url: 'img/9.jpg', keywords: ['all', 'square', 'baby', 'mood', 'laugh', 'cute'] },
    { id: 10, url: 'img/10.jpg', keywords: ['all', 'square', 'obama', 'mood', 'laugh', 'man'] },
    { id: 11, url: 'img/11.jpg', keywords: ['all', 'square', 'fight', 'kiss', 'man'] },
    { id: 12, url: 'img/12.jpg', keywords: ['all', 'square', 'tv' ,'point', 'man'] },
    { id: 13, url: 'img/13.jpg', keywords: ['all', 'square', 'tv', 'cheers', 'man'] },
    { id: 14, url: 'img/14.jpg', keywords: ['all', 'square', 'tv', 'matrix', 'serious', 'man'] },
    { id: 15, url: 'img/15.jpg', keywords: ['all', 'square', 'tv', 'zero', 'man'] },
    { id: 16, url: 'img/16.jpg', keywords: ['all', 'square', 'tv', 'mood', 'laugh', 'man'] },
    { id: 17, url: 'img/17.jpg', keywords: ['all', 'square', 'putin', 'two', 'man'] },
    { id: 18, url: 'img/18.jpg', keywords: ['all', 'square', 'tv', 'toy'] },
    { id: 19, url: 'img/19.jpg', keywords: ['all', 'tv', 'mood', 'man'] },
    { id: 20, url: 'img/20.jpg', keywords: ['all', 'mood', 'happy', 'woman'] },
    { id: 21, url: 'img/21.jpg', keywords: ['all', 'trump', 'man'] },
    { id: 22, url: 'img/22.jpg', keywords: ['all', 'dogs', 'cute'] },
    { id: 23, url: 'img/23.jpg', keywords: ['all', 'baby', 'mood', 'cute'] },
    { id: 24, url: 'img/24.jpg', keywords: ['all', 'dogs', 'baby', 'cute', 'mood'] },
    { id: 25, url: 'img/25.jpg', keywords: ['all', 'cats', 'mood', 'cute'] },
    { id: 26, url: 'img/26.jpg', keywords: ['all', 'tv', 'man'] },
    { id: 27, url: 'img/27.jpg', keywords: ['all', 'baby', 'mood', 'laugh', 'cute'] },
    { id: 28, url: 'img/28.jpg', keywords: ['all', 'tv' ,'point', 'man'] },
    { id: 29, url: 'img/29.jpg', keywords: ['all', 'tv', 'mood', 'man'] },
    { id: 30, url: 'img/30.jpg', keywords: ['all', 'tv' ,'mood', 'man'] },
    { id: 31, url: 'img/31.jpg', keywords: ['all', 'baby', 'mood', 'happy', 'cute'] },
    { id: 32, url: 'img/32.jpg', keywords: ['all', 'trump', 'man'] },
    { id: 33, url: 'img/33.jpg', keywords: ['all', 'baby', 'mood', 'cute'] },
    { id: 34, url: 'img/34.jpg', keywords: ['all', 'dogs', 'puppy', 'cute'] },
    { id: 35, url: 'img/35.jpg', keywords: ['all', 'obama', 'mood', 'laugh', 'man'] },
    { id: 36, url: 'img/36.jpg', keywords: ['all', 'fight', 'kiss', 'man'] },
    { id: 37, url: 'img/37.jpg', keywords: ['all', 'tv', 'cheers', 'man'] },
    { id: 38, url: 'img/38.jpg', keywords: ['all', 'tv', 'matrix', 'serious', 'man'] },
    { id: 39, url: 'img/39.jpg', keywords: ['all', 'tv', 'zero', 'man'] },
]

// var gImgs = []

// createImgs()

// function createImgs() {
//     for (var i = 1; i <= 39; i++) {
//         var imgUrl = 'img/' + i + '.jpg'
//         var imgObj = { id: i, url: imgUrl, keywords: [] }
//         gImgs.push(imgObj)
//     }
// }

function createMeme(pos) {
    const { posX, posY } = pos
    return gMeme = {
        selectedImgId: 4,
        selectedLineIdx: 0,
        lines: [
            {
                txt: `How's Sprint 2 going?`,
                size: 40,
                color: 'white',
                stroke: 'black',
                position: { x: posX, y: posY },
                isDrag: false,
            }
        ]
    }
}

function getMeme() {
    return gMeme
}

function getFillColor() {
    return gFillColor
}

function getStrokeColor() {
    return gStrokeColor
}

function getFontFamily() {
    return gFontFamily
}

function getSelectedLineIdx() {
    return gSelectedLineIdx
}

function setLineTxt(txt, lineIdx) {
    _updateMeme(txt, lineIdx)
}

function setFillColor(color, lineIdx) {
    gFillColor = color
    gMeme.lines[lineIdx].color = color
}

function setStrokeColor(color, lineIdx) {
    gStrokeColor = color
    gMeme.lines[lineIdx].stroke = color
}

function addNewLine(pos) {
    var { x, y } = pos

    const defaultText = 'New Text'
    const defaultSize = 40
    const defaultColor = 'white'
    const defaultStroke = 'black'

    // Add a new line to the meme lines array
    const newLine = {
        txt: defaultText,
        size: defaultSize,
        color: defaultColor,
        stroke: defaultStroke,
        position: { x, y },
        isDrag: false,
    }

    gMeme.lines.push(newLine)

    gSelectedLineIdx = gMeme.lines.length - 1

}

function switchLine() {
    const { lines } = gMeme

    if (lines.length <= 1) return

    gSelectedLineIdx = (gSelectedLineIdx + 1) % lines.length
}

function deleteLine() {
    const { lines } = gMeme

    if (lines.length <= 1) return

    lines.splice(gSelectedLineIdx, 1)

    if (lines.length > 0) {
        gSelectedLineIdx = (gSelectedLineIdx === 0) ? 0 : (gSelectedLineIdx - 1) % lines.length
    }
}

function changeFontSize(diff) {
    const { lines } = gMeme

    if (lines.length === 0) return

    const selectedLine = lines[gSelectedLineIdx]

    selectedLine.size = Math.min(100, Math.max(20, selectedLine.size + diff));
}

function changeFontFamily(fontFamily) {
    const { lines } = gMeme

    if (lines.length === 0) return

    const selectedLine = lines[gSelectedLineIdx]

    selectedLine.fontFamily = (fontFamily === 'myImpact') ? 'myImpact' : fontFamily
    gFontFamily = fontFamily
}

function setTextAlignment(align) {
    var posX
    switch (align) {
        case 'left':
            posX = 50
            break
        case 'center':
            posX = gElCanvas.width / 2
            break
        case 'right':
            posX = gElCanvas.width - 50
            break
    }

    gMeme.lines.forEach((line) => {
        const textWidth = gCtx.measureText(line.txt).width
        const halfTextWidth = textWidth / 2

        switch (align) {
            case 'left':
                line.position.x = posX + halfTextWidth
                break
            case 'center':
                line.position.x = posX
                break
            case 'right':
                line.position.x = posX - halfTextWidth
                break
        }
    })
}

// private functions
function _updateMeme(txt, lineIdx) {
    const { lines } = gMeme

    if (lines.length > 0 && lineIdx >= 0 && lineIdx < lines.length) {
        lines[lineIdx].txt = txt
    } else {
        gMeme.lines.push({
            txt,
            size: 40,
            color: 'black'
        })
        gSelectedLineIdx = gMeme.lines.length - 1;
    }

    return gMeme
}
