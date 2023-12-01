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
    
    createMeme( { posX: gElCanvas.width / 2, posY: 50 } ) 

    window.addEventListener('resize', () => {
        resizeCanvas()
        gMeme.lines.forEach((line, idx) => {
            line.position.x = gElCanvas.width / 2

            if (idx === 1) {
                line.position.y = gElCanvas.height - 50
            } else if (idx > 1) {
                line.position.y = gElCanvas.height / 2
            }
        })
        renderMeme()
    })

    renderMeme()
    renderTxtInput ()
}

function toggleMenu() {
    document.body.classList.toggle('menu-open')
}

function onChangeToSection(section) {
    var elOtherSection1
    var elOtherSection2

    switch (section) {
        case ('gallery'):
            elOtherSection1 = document.querySelector(`.editor-section`)
            elOtherSection2 = document.querySelector(`.saved-section`)
            break
        case ('editor'):
            elOtherSection1 = document.querySelector(`.gallery-section`)
            elOtherSection2 = document.querySelector(`.saved-section`)
            break
        case ('saved'):
            elOtherSection1 = document.querySelector(`.editor-section`)
            elOtherSection2 = document.querySelector(`.gallery-section`)
            break
    }

    const elCurrSection = document.querySelector(`.${section}-section`)

    if (elCurrSection.style.display === 'grid') return

    gCurrDisplay = section
    elCurrSection.style.display = 'grid' 
    elOtherSection1.style.display = 'none'
    elOtherSection2.style.display = 'none'

    if (document.body.classList.contains('menu-open')) document.body.classList.remove('menu-open')
}

