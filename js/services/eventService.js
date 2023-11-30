'use strict'

let gStartPos
let gPrevPos

const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

function addListeners() {
    // addMouseListeners()
    // addTouchListeners()

    gElCanvas.addEventListener('click', onCanvasClick)
}

function onCanvasClick(ev) {
    const clickedX = ev.offsetX
    const clickedY = ev.offsetY
    console.log('clickedX:', clickedX)
    console.log('clickedY:', clickedY)

    // Check if the click is within the bounds of the text
    if (clickedX > gElCanvas.width / 2 - textWidth / 2 &&
        clickedX < gElCanvas.width / 2 + textWidth / 2 &&
        clickedY > gTxtYPlacement - textHeight / 2 &&
        clickedY < gTxtYPlacement + textHeight / 2) {

        // Set the selected line index
        gSelectedLineIdx = idx
        // Update the input field with the selected line's text
        renderTxtInput()
    }
}


// function addMouseListeners() {
//     gElCanvas.addEventListener('mousedown', onDown)
//     gElCanvas.addEventListener('mousemove', onMove)
//     gElCanvas.addEventListener('mouseup', onUp)
// }

// function addTouchListeners() {
//     gElCanvas.addEventListener('touchstart', onDown)
//     gElCanvas.addEventListener('touchmove', onMove)
//     gElCanvas.addEventListener('touchend', onUp)
// }

// function onDown(ev) {
//     const pos = getEvPos(ev)
//     gPrevPos = { ...pos }
// }

// function onMove(ev) {
//     if (!gDrawing) return
//     const pos = getEvPos(ev)

//     drawShape(pos.x, pos.y)

//     gPrevPos = { ...pos }
// }

// function onUp() {
//     gDrawing = false
// }

// function getEvPos(ev) {

//     let pos = {
//         x: ev.offsetX,
//         y: ev.offsetY,
//     }

//     if (TOUCH_EVS.includes(ev.type)) {
//         // Prevent triggering the mouse ev
//         ev.preventDefault()
//         // Gets the first touch point
//         ev = ev.changedTouches[0]
//         // Calc the right pos according to the touch screen
//         pos = {
//             x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
//             y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
//         }
//     }
//     return pos
// }

