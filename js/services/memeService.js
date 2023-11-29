'use strict'

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