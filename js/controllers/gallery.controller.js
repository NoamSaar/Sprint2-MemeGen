'use strict'

let gStartPos
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

function renderDataList() {
    const imgDataList = document.querySelector('.img-data-list')
    const imgs = getImgs()

    const uniqueKeywords = []

    imgs.forEach(img => {
        img.keywords.forEach(keyword => {
            if (!uniqueKeywords.includes(keyword)) {
                uniqueKeywords.push(keyword)
                const option = document.createElement('option')
                option.value = keyword
                imgDataList.appendChild(option)
            }
        })
    })
}

function renderGallery() {
    const imgs = getImgsToShow()

    var strHtml = imgs.map(img => `
        <div class="cell">
            <img data-img-id="${img.id}" onclick="onImgSelect(${img.id})" src="${img.url}" alt="Gallery Img"></img>
        </div>
    `).join('')

    document.querySelector('.imgs-container').innerHTML = strHtml
}

function renderFilterFontSizes() {
    const filterFontSizes = getFilterFontSizes()

    if (!filterFontSizes) return

    Object.entries(filterFontSizes).forEach(([filterName, size]) => {
        var elFilter = document.querySelector(`.filter-${filterName}`)
        if (elFilter) {
            elFilter.style.fontSize = size + 'px'
        }
    })
}

function renderSelectMenu() {
    var displayedKeywords = getDisplayedKeywords()
    const remainingKeywords = getRemainingKeywords(displayedKeywords)

    if (!remainingKeywords.length) return

    var elSelectElement = document.querySelector('select[name="filter-options"]')

    elSelectElement.innerHTML = ''

    remainingKeywords.forEach(keyword => {
        var optionElement = document.createElement('option')
        optionElement.value = keyword
        optionElement.textContent = keyword
        elSelectElement.appendChild(optionElement)
    })

    elSelectElement.addEventListener('change', function (event) {
        var selectedKeyword = event.target.value
        setFilterBy(selectedKeyword)
    })
}

function renderSavedMemes() {
    const savedMemes = getSavedMemes()

    if (!savedMemes.length) return

    const savedSection = document.querySelector('.meme-section')
    savedSection.innerHTML = ''

    savedMemes.forEach((meme, index) => {
        const savedImg = document.createElement('img')
        savedImg.src = meme.url
        savedImg.addEventListener('click', () => onEditSavedMeme(index))

        savedSection.appendChild(savedImg)
    })
}

function onFilterByCategory(filterBy) {
    setFilterBy(filterBy)
    renderGallery()
}

function onFilterClick(filter, name) {
    const currFontSize = parseFloat(window.getComputedStyle(filter).fontSize)
    console.log('currFontSize:', currFontSize)
    const maxSize = 25

    if (currFontSize < maxSize) {
        const newSize = currFontSize + 0.2
        filter.style.fontSize = newSize + 'px'
        saveSizeToStorage(name, newSize)
    }
}

function onInputFilter(value) {
    const imgDataList = document.querySelector('.img-data-list')
    const options = imgDataList.querySelectorAll('option')

    options.forEach(option => {
        const optionValue = option.value.toLowerCase()
        if (optionValue.includes(value.toLowerCase())) {
            document.querySelector('.search-input').value = optionValue
            return
        }
    })

    const searchInput = value.toLowerCase()
    setFilterBy(searchInput)
    renderGallery()
}

function onImgSelect(imgId) {
    renderImg(imgId)
    renderMeme()
    onChangeToSection('editor')
}

function onFlexibleMode() {
    const imgs = getImgs()
    const randomInt = getRandomInt(0, imgs.length)
    onImgSelect(randomInt)
}

function onSaveToMemeSection() {
    const meme = getMeme()
    meme.url = gElCanvas.toDataURL()
    saveMeme(meme)
    renderSavedMemes()
}

function onEditSavedMeme(index) {
    const savedMemes = getSavedMemes()
    const memeToEdit = savedMemes[index]

    loadMemeForEditing(memeToEdit)
    renderMeme()
    onChangeToSection('editor')
}

function getDisplayedKeywords() {
    var displayedKeywords = []

    var elFilterArticles = document.querySelectorAll('.image-filter article')

    elFilterArticles.forEach(article => {
        var keyword = article.textContent.toLowerCase()
        displayedKeywords.push(keyword)
    })

    return displayedKeywords
}

// LOAD USER IMG
function onChangeImgInput(ev) {
    loadImgFromInput(ev, renderImg)
    onChangeToSection('editor')
}

function loadImgFromInput(ev, onimgReady) {
    const reader = new FileReader()
    reader.onload = function (event) {
        let img = new img()
        img.src = event.target.result
        img.onload = () => {
            renderImg(addNewImg(img))
            onimgReady(img)
            onSelectImg(img)
            renderGallery()
        }
    }
    reader.readAsDataURL(ev.target.files[0])
}

function renderImg(img) {
    gCtx.drawImage(img, 0, 0, gElCanvas.width - 1, gElCanvas.height - 1)
}

function addNewImg(img) {
    return createNewImg(img)
}

function onSelectImg(elImg) {
    coverCanvasWithImg(elImg)
}

function coverCanvasWithImg(elImg) {
    gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
    gCtx.drawimg(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}

// LINE DRAG HANDLING
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
    if (gMeme.selectedLineIdx === -1) return

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

function getEvPos(ev) {
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }

    if (TOUCH_EVS.includes(ev.type)) {
        // Prevent triggering the mouse event
        ev.preventDefault()
        // Gets the first touch point
        ev = ev.changedTouches[0]
        // Calculate the right position according to the touch screen
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
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


// function updateKeywordsList() {
//     const datalist = document.getElementById('keywords')
//     const uniqueKeywords = getUniqueKeywords(gImgs)

//     datalist.innerHTML = ''
//     uniqueKeywords.forEach(keyword => {
//         const option = document.createElement('option')
//         option.value = keyword
//         datalist.appendChild(option)
//     })
// }