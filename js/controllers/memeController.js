'use strict'

let gTxtYPlacement = 50

function renderMeme() {
    const meme = getMeme()
    drawImage(meme.selectedImgId)
    meme.lines.forEach(line => {
        drawText(line.txt, 40, gElCanvas.width / 2, gTxtYPlacement)
    })
}

function renderTxtInput () {
    const elTxtInput = document.querySelector('input[type="text"]')

    const { lines } = getMeme()
    const currTxt = lines[0].txt

    elTxtInput.value = currTxt
}

function onChangeInput(txt) {
    setLineTxt(txt)
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
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = 'white'
    gCtx.font = `${size}px myImpact`
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
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