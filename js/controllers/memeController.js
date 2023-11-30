'use strict'


function renderMeme() {
    const meme = getMeme()
    drawImage(meme.selectedImgId)

    const lineHeight = 20
    const canvasCenter = gElCanvas.height / 2
    const totalLines = meme.lines.length

    meme.lines.forEach((line, idx) => {
        let newYPlacement;

        if (idx === 0) {
            newYPlacement = 50
        } else if (idx === 1) {
            newYPlacement = gElCanvas.height - 50;
        } else {
            newYPlacement = gElCanvas.height / 2;
        }

        drawText(line.txt, line.size, gElCanvas.width / 2, newYPlacement);
        if (idx === gSelectedLineIdx) {
            // You can add a visual indication for the selected line, for example, a border
            gCtx.strokeStyle = 'white'
            gCtx.strokeRect(
                gElCanvas.width / 2 - gCtx.measureText(line.txt).width / 2,
                newYPlacement - line.size / 2,
                gCtx.measureText(line.txt).width,
                line.size
            );
        }
    });
}

function renderTxtInput() {
    const elTxtInput = document.querySelector('input[type="text"]')

    const { lines } = getMeme()
    const currLine = getSelectedLineIdx()
    const currTxt = lines[currLine].txt

    elTxtInput.value = currTxt
}

function onAddNewLine() {
    addNewLine()
    renderMeme()
    renderTxtInput()
}

function onSwitchLine() {
    switchLine()
    renderMeme()
    renderTxtInput()
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
    gCtx.font = `${size}px myImpact`
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
    const dataUrl = gElCanvas.toDataURL()
    elLink.href = dataUrl
    elLink.download = 'my-img'
}

// function onImgInput(ev) {
//     loadImageFromInput(ev, renderImg)
// }

// function loadImageFromInput(ev, onImageReady) {
//     const reader = new FileReader()
//     reader.onload = function (event) {
//         let img = new Image() 
//         img.src = event.target.result 
//         img.onload = () => {
//             onImageReady(img)
//             onSelectImg(img)
//         }
//     }
//     reader.readAsDataURL(ev.target.files[0]) 
// }