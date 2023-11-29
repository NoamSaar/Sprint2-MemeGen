'use strict'

var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: [] },
    { id: 2, url: 'img/2.jpg', keywords: [] },
    { id: 3, url: 'img/3.jpg', keywords: [] },
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

function setLineTxt(txt) {
    _updateMeme(txt)
}

function _updateMeme(txt) {
    const { selectedLineIdx, lines } = gMeme

    if (lines.length > 0 && selectedLineIdx >= 0 && selectedLineIdx < lines.length) {
        lines[selectedLineIdx].txt = txt
    } else {
        gMeme.lines.push({
            txt,
            size: 40,
            color: 'black'
        })
    }

    return gMeme
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId
}