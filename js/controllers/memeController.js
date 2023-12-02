'use strict'

let isDrawingImage = false

function renderMeme() {
    const meme = getMeme()
    drawImage(meme.selectedImgId)
}

function drawLines(meme, color = 'white') {
    meme.lines.forEach((line, idx) => {
        drawText(line.txt, line.size, line.position.x, line.position.y)

        if (idx === getSelectedLineIdx()) {
            gCtx.strokeStyle = color
            gCtx.strokeRect(
                line.position.x - gCtx.measureText(line.txt).width / 2,
                line.position.y - line.size / 2,
                gCtx.measureText(line.txt).width,
                line.size
            )
        }
    })
}

function drawImage(imgId) {
    if (isDrawingImage) {
        return
    }

    isDrawingImage = true

    const elImg = new Image()
    const imgs = getImages()
    const { url } = imgs[imgId - 1]

    elImg.src = url
    
    elImg.onload = () => {
        coverCanvasWithImg(elImg)
        isDrawingImage = false
        // renderMeme()
    }
}

function coverCanvasWithImg(elImg) {
    gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)

    const meme = getMeme()
    drawLines(meme)
    // renderMeme()
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

function onSetTextAlignment(align) {
    setTextAlignment(align)
    renderMeme()
}

function onChangeInput(txt) {
    setLineTxt(txt, getSelectedLineIdx())
    renderMeme()
}

function onSetFillColor(color, lineIdx = 0) {
    setFillColor(color, lineIdx)
    renderMeme()
}

function onSetStrokeColor(color, lineIdx = 0) {
    setStrokeColor(color, lineIdx)
    renderMeme()
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

function onUploadImg() {
    // Gets the image from the canvas
    const imgDataUrl = gElCanvas.toDataURL('image/jpeg') 

    function onSuccess(uploadedImgUrl) {
        // Handle some special characters
        const url = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${url}`)
    }
    
    // Send the image to the server
    doUploadImg(imgDataUrl, onSuccess)
}

// Upload the image to a server, get back a URL 
// call the function onSuccess when done
function doUploadImg(imgDataUrl, onSuccess) {
    // Pack the image for delivery
    const formData = new FormData()
    formData.append('img', imgDataUrl)

    // Send a post req with the image to the server
    const XHR = new XMLHttpRequest()
    XHR.onreadystatechange = () => {
        // If the request is not done, we have no business here yet, so return
        if (XHR.readyState !== XMLHttpRequest.DONE) return
        // if the response is not ok, show an error
        if (XHR.status !== 200) return console.error('Error uploading image')
        const { responseText: url } = XHR
        // Same as
        // const url = XHR.responseText

        // If the response is ok, call the onSuccess callback function, 
        // that will create the link to facebook using the url we got
        console.log('Got back live url:', url)
        onSuccess(url)
    }
    XHR.onerror = (req, ev) => {
        console.error('Error connecting to server with request:', req, '\nGot response data:', ev)
    }
    XHR.open('POST', '//ca-upload.com/here/upload.php')
    XHR.send(formData)
}