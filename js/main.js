// 'use strict'

let gElCanvas
let gCtx

let gCurrDisplay = 'editor'

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    
    addListeners()
    
    
    renderGallery()
    resizeCanvas()
    
    posX = gElCanvas.width / 2
    posY = 50
    createMeme( {posX, posY} ) 

    window.addEventListener('resize', () => {
        resizeCanvas()
        renderMeme()
    })

    renderMeme()
    renderTxtInput ()
}

function toggleMenu() {
    document.body.classList.toggle('menu-open')
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

    gCurrDisplay = section
    elCurrSection.style.display = 'grid' 
    elPrevSection.style.display = 'none'

    if (document.body.classList.contains('menu-open')) document.body.classList.remove('menu-open')
}

