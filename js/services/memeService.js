'use strict'

let gSelectedLineIdx = 0

let gFillColor = 'white'
let gStrokeColor = 'black'
let gFontSize = 40

var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: [] },
    { id: 2, url: 'img/2.jpg', keywords: [] },
    { id: 3, url: 'img/3.jpg', keywords: [] },
    { id: 4, url: 'img/4.jpg', keywords: [] },
    { id: 5, url: 'img/5.jpg', keywords: [] },
    { id: 6, url: 'img/6.jpg', keywords: [] },
    { id: 7, url: 'img/7.jpg', keywords: [] },
    { id: 8, url: 'img/8.jpg', keywords: [] },
    { id: 9, url: 'img/9.jpg', keywords: [] },
    { id: 10, url: 'img/10.jpg', keywords: [] },
    { id: 11, url: 'img/11.jpg', keywords: [] },
    { id: 12, url: 'img/12.jpg', keywords: [] },
    { id: 13, url: 'img/13.jpg', keywords: [] },
    { id: 14, url: 'img/14.jpg', keywords: [] },
    { id: 15, url: 'img/15.jpg', keywords: [] },
    { id: 16, url: 'img/16.jpg', keywords: [] },
    { id: 17, url: 'img/17.jpg', keywords: [] },
    { id: 18, url: 'img/18.jpg', keywords: [] },
]

var gMeme = {
    selectedImgId: 4,
    selectedLineIdx: 0,
    lines: [
        {
            txt: `How's Sprint 2 going?`,
            size: 40,
            color: 'white',
            stroke: 'black',
        }
    ]
}

function getMeme() {
    return gMeme
}

function getImages() {
    return gImgs
}

function getFillColor() {
    return gFillColor
}

function getStrokeColor() {
    return gStrokeColor
}

function getSelectedLineIdx() {
    return gSelectedLineIdx
}

function setLineTxt(txt, lineIdx) {
    _updateMeme(txt, lineIdx)
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId
}

function setFillColor(color, lineIdx) {
    gFillColor = color
    gMeme.lines[lineIdx].color = color
}

function setStrokeColor(color, lineIdx) {
    gStrokeColor = color
    gMeme.lines[lineIdx].stroke = color
}

function changeFontSize(diff, lineIdx) {

}

function addNewLine() {
    const defaultText = 'New Text'
    const defaultSize = 40
    const defaultColor = 'white'
    const defaultStroke = 'black'

    // Add a new line to the meme lines array
    gMeme.lines.push({
        txt: defaultText,
        size: defaultSize,
        color: defaultColor,
        stroke: defaultStroke,
    })

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
    console.log('diff:', diff)
    const { lines } = gMeme

    if (lines.length === 0) return

    const selectedLine = lines[gSelectedLineIdx]

    selectedLine.size = Math.min(100, Math.max(20, selectedLine.size + diff));
}

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