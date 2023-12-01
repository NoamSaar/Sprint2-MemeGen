'use strict'

let gStartPos
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

function onCanvasClick(ev) {
    const clickedPos = getEvPos(ev)
    
    // Check if any line is clicked
    const clickedLineIdx = findClickedLine(clickedPos)

    if (clickedLineIdx !== -1) {
        gMeme.selectedLineIdx = clickedLineIdx
        gSelectedLineIdx = clickedLineIdx
        renderMeme()
        renderTxtInput()
    }
}

function findClickedLine(clickedPos) {
    const { lines } = gMeme

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i]
        const textWidth = gCtx.measureText(line.txt).width
        const halfTextWidth = textWidth / 2

        if (
            clickedPos.x >= line.position.x - halfTextWidth &&
            clickedPos.x <= line.position.x + halfTextWidth &&
            clickedPos.y >= line.position.y - line.size / 2 &&
            clickedPos.y <= line.position.y + line.size / 2
        ) {
            return i
        }
    }

    return -1 // No line clicked
}

function onDown(ev) {
    const clickedPos = getEvPos(ev)

    const clickedLineIdx = findClickedLine(clickedPos)

    if (clickedLineIdx !== -1) {
        setLineDrag(true, clickedLineIdx)
        gMeme.selectedLineIdx = clickedLineIdx
        gSelectedLineIdx = clickedLineIdx
        
        gStartPos = clickedPos
        document.body.style.cursor = 'grabbing'
    }
}

function onMove(ev) {
    const { isDrag } = gMeme.lines[gMeme.selectedLineIdx]
    if (!isDrag) return

    const pos = getEvPos(ev)

    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y

    moveLine(gMeme.selectedLineIdx, dx, dy)

    gStartPos = pos
    renderMeme()
}

function onUp() {
    setLineDrag(false, gMeme.selectedLineIdx)
    document.body.style.cursor = 'grab'
    gMeme.selectedLineIdx = -1
}

function setLineDrag(isDrag, lineIdx) {
    gMeme.lines[lineIdx].isDrag = isDrag
}

function moveLine(lineIdx, dx, dy) {
    gMeme.lines[lineIdx].position.x += dx
    gMeme.lines[lineIdx].position.y += dy
}

function getEvPos(ev) {
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    };

    if (TOUCH_EVS.includes(ev.type)) {
        // Prevent triggering the mouse event
        ev.preventDefault()
        // Gets the first touch point
        ev = ev.changedTouches[0]
        // Calculate the right position according to the touch screen
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        };
    }
    return pos
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()

    gElCanvas.addEventListener('click', onCanvasClick)
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchstart', onDown, { passive: true })
    gElCanvas.addEventListener('touchmove', onMove, { passive: true })
    gElCanvas.addEventListener('touchend', onUp, { passive: true })
}