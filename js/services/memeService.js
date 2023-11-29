'use strict'

var gImgs = [{ id: 1, url: 'img/1.jpg', keywords: [] }]

var gMeme = {
    selectedImgId: 4,
    selectedLineIdx: 0,
    lines: [
        {
            txt: `How's Sprint 2 going?`,
            size: 20,
            color: 'red'
        }
    ]
}

function getMeme() {
    return gMeme
}