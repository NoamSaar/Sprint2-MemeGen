'use strict'

let gElCanvas
let gCtx

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    renderMeme()
    resizeCanvas()

    window.addEventListener('resize', () => {
        resizeCanvas
        renderMeme
    })
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')

    gElCanvas.width = elContainer.clientWidth - 2
}

function renderMeme() {
    drawImage()
    drawText()
}

function drawImage() {
    const elImg = new Image()

    elImg.src = './img/4.jpg'
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
    }
}

function drawText(text, x, y) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = 'white'
    gCtx.font = '40px Arial'
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
}

function renderImg(img) {
    gCtx.drawImage(img, 0, 0, gElCanvas.width - 1, gElCanvas.height - 1)
}

function onChangeToSection(section) {
    var elPrevSection

    if (section === 'gallery') {
        elPrevSection = document.querySelector(`.editor-section`)
    } else {
        elPrevSection = document.querySelector(`.gallery-section`)
    }

    const elCurrSection = document.querySelector(`.${section}-section`)
    
    if (elCurrSection.style.display === 'grid') return

    elCurrSection.style.display = 'grid' 
    elPrevSection.style.display = 'none'
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