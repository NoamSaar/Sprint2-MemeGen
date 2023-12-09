'use strict'

let gElCanvas
let gCtx
let gCurrDisplay = 'editor'

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    addListeners()

    renderSavedMemes()
    renderGallery()
    renderFilterFontSizes()
    renderSelectMenu()
    renderDataList()
    
    resizeCanvas()
    createMeme({ posX: gElCanvas.width / 2, posY: 50 })
    
    renderMeme()
    renderTxtInput()


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
}

function onToggleMenu() {
    document.body.classList.toggle('menu-open')
}

function onChangeToSection(section) {
    var elSectionToHide1
    var elSectionToHide2

    const elEditor = document.querySelector(`.editor-section`)
    const elGallery = document.querySelector(`.gallery-section`)
    const elSaved = document.querySelector(`.meme-section`)

    switch (section) {
        case ('gallery'):
            elSectionToHide1 = elEditor
            elSectionToHide2 = elSaved
            break
        case ('editor'):
            elSectionToHide1 = elGallery
            elSectionToHide2 = elSaved
            break
        case ('meme'):
            elSectionToHide1 = elEditor
            elSectionToHide2 = elGallery
            break
    }

    const elSectionToDisplay = document.querySelector(`.${section}-section`)

    if (elSectionToDisplay.style.display === 'grid') return

    gCurrDisplay = section
    elSectionToDisplay.style.display = 'grid'
    elSectionToHide1.style.display = 'none'
    elSectionToHide2.style.display = 'none'

    if (document.body.classList.contains('menu-open')) document.body.classList.remove('menu-open')
}

