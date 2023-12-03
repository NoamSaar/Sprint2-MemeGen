'use strict'

let gFillColor = 'white'
let gStrokeColor = 'black'
let gFontSize = 40
let gFontFamily = 'Impact'

let gSelectedLineIdx = 0
let gMeme

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
    const lines = _getLinesFromModel()

    if (lines.length <= 1) return

    gSelectedLineIdx = (gSelectedLineIdx + 1) % lines.length
}

function deleteLine() {
    const lines = _getLinesFromModel()

    if (!lines) return

    lines.splice(gSelectedLineIdx, 1)

    if (lines.length > 0) {
        gSelectedLineIdx = (gSelectedLineIdx === 0) ? 0 : (gSelectedLineIdx - 1) % lines.length
    }
}

function changeFontSize(diff) {
    const lines = _getLinesFromModel()

    if (!lines) return

    const selectedLine = lines[gSelectedLineIdx]

    selectedLine.size = Math.min(100, Math.max(20, selectedLine.size + diff))
}

function changeFontFamily(fontFamily) {
    const lines = _getLinesFromModel()

    if (!lines) return

    const selectedLine = lines[gSelectedLineIdx]
    
    selectedLine.fontFamily = (fontFamily === 'Impact') ? 'myImpact' : fontFamily
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

function setLineDrag(isDrag, lineIdx) {
    if (lineIdx === -1) return
    gMeme.lines[lineIdx].isDrag = isDrag
}

function moveLine(lineIdx, dx, dy) {
    gMeme.lines[lineIdx].position.x += dx
    gMeme.lines[lineIdx].position.y += dy
}

// private functions
function _updateMeme(txt, lineIdx) {
    const lines = _getLinesFromModel()

    if (lines.length > 0 && lineIdx >= 0 && lineIdx < lines.length) {
        lines[lineIdx].txt = txt
    } else {
        gMeme.lines.push({
            txt,
            size: 40,
            color: 'black'
        })
        gSelectedLineIdx = gMeme.lines.length - 1
    }

    return gMeme
}

function _getLinesFromModel() {
    const { lines } = gMeme

    if (!lines.length) return null
    else return lines
}
