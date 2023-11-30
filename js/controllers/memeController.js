'use strict'


function renderMeme(color = 'white') {
    const meme = getMeme()
    drawImage(meme.selectedImgId)

    meme.lines.forEach((line, idx) => {
        let newYPlacement

        if (idx === 0) {
            newYPlacement = 50
        } else if (idx === 1) {
            newYPlacement = gElCanvas.height - 50
        } else {
            newYPlacement = gElCanvas.height / 2
        }

        drawText(line.txt, line.size, gElCanvas.width / 2, newYPlacement)
        if (idx === getSelectedLineIdx()) {
            // You can add a visual indication for the selected line, for example, a border
            gCtx.strokeStyle = color
            gCtx.strokeRect(
                gElCanvas.width / 2 - gCtx.measureText(line.txt).width / 2,
                newYPlacement - line.size / 2,
                gCtx.measureText(line.txt).width,
                line.size
            )
        }
    })
}

function renderTxtInput() {
    const elTxtInput = document.querySelector('input[type="text"]')

    const { lines } = getMeme()
    const currLine = getSelectedLineIdx()
    const currTxt = lines[currLine].txt

    elTxtInput.value = currTxt
}

function onAddNewLine() {
    const meme = getMeme()
    const currLineIdx = meme.lines.length

    var newYPlacement 
    var newXPlacement = gElCanvas.width / 2

    if (currLineIdx === 0) {
        newYPlacement = 50
    } else if (currLineIdx === 1) {
        newYPlacement = gElCanvas.height - 50
    } else {
        newYPlacement = gElCanvas.height / 2
    }

    addNewLine( { x: newXPlacement, y: newYPlacement})
    renderMeme()
    renderTxtInput()
}

function onSwitchLine() {
    switchLine()
    renderMeme()
    renderTxtInput()
}

function onDeleteLine() {
    deleteLine()
    renderMeme()
    renderTxtInput()
}

function onChangeFontSize(diff) {
    changeFontSize(diff)
    renderMeme()
}

function onChangeFontFamily(fontFamily) {
    changeFontFamily(fontFamily)
    renderMeme()
}

function onSetTextAlignment(diff) {
    setTextAlignment(diff)
    renderMeme()
}

function onChangeInput(txt) {
    setLineTxt(txt, getSelectedLineIdx())
    renderMeme()
}

function drawImage(imgId) {
    const elImg = new Image()

    elImg.src = `./img/${imgId}.jpg`
    elImg.onload = () => {
        coverCanvasWithImg(elImg)
    }
}

function drawText(text, size, x, y) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = getStrokeColor()
    gCtx.fillStyle = getFillColor()
    gCtx.font = `${size}px ${getFontFamily()}`
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

function onSetFillColor(color, lineIdx = 0) {
    setFillColor(color, lineIdx)
    renderMeme()
}

function onSetStrokeColor(color, lineIdx = 0) {
    setStrokeColor(color, lineIdx)
    renderMeme()
}

function onSelectImg(elImg) {
    coverCanvasWithImg(elImg)
}

function coverCanvasWithImg(elImg) {
    gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)

    renderMeme()
}

function renderImg(img) {
    gCtx.drawImage(img, 0, 0, gElCanvas.width - 1, gElCanvas.height - 1)
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')

    gElCanvas.width = elContainer.clientWidth - 1
}


function onDownloadCanvas(elLink) {
    const originalStrokeStyle = gCtx.strokeStyle
    gCtx.strokeStyle = 'transparent'
    renderMeme('transparent')
    
    const dataUrl = gElCanvas.toDataURL()

    gCtx.strokeStyle = originalStrokeStyle
    renderMeme(originalStrokeStyle)

    elLink.href = dataUrl
    elLink.download = 'my-img'
}


function onOpenColorPicker(type) {
    const colorPicker = document.createElement('input');
    colorPicker.type = 'color'

    colorPicker.addEventListener('input', function() {
        setColor(colorPicker.value, type)
    })

    colorPicker.click()
}

function setColor(color, type) {
    if (type === 'fill') {
        onSetFillColor(color)
    } else if (type === 'stroke') {
        onSetStrokeColor(color)
    }
}