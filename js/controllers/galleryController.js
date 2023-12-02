'use strict'

function createDataList() {
    const imageDataList = document.getElementById('image-data-list')
    const images = getImages()

    var uniqueKeywords = []

    images.forEach(img => {
        img.keywords.forEach(keyword => {
            if (!uniqueKeywords.includes(keyword)) {
                uniqueKeywords.push(keyword)
                var option = document.createElement('option')
                option.value = keyword
                imageDataList.appendChild(option)
            }
        })
    })
}

function renderGallery() {
    const images = getImagesToShow()

    var strHtml = images.map(img => `
        <img data-img-id="${img.id}" onclick="onImgSelect(${img.id})" src="${img.url}" alt="Gallery Image"></img>
    `).join('')

    document.querySelector('.images-container').innerHTML = strHtml
}

function renderFilterSizes() {
    var sizes = getSizes()

    if (!sizes) return

    Object.entries(sizes).forEach(([filterName, size]) => {
        var elFilter = document.querySelector(`.filter-${filterName}`)
        if (elFilter) {
            elFilter.style.fontSize = size + 'px'
        }
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

function onInputFilter() {
    var searchInput = document.getElementById('searchInput').value.toLowerCase()
    setFilterBy(searchInput)
    renderGallery()
}

function onImgSelect(imgId) {
    setImg(imgId)
    renderMeme()
    onChangeToSection('editor')
}

function onFlexibleMode() {
    const imgs = getImages()
    const randomInt = getRandomInt(0, imgs.length)
    onImgSelect(randomInt)
}

function onSaveToSaved() {
    const meme = getMeme()
    meme.url = gElCanvas.toDataURL()
    saveMeme(meme)
    renderSavedMemes()
}

function renderSavedMemes() {
    const savedMemes = getSavedMemes()

    if (!savedMemes.length) return

    const savedSection = document.querySelector('.saved-section')
    savedSection.innerHTML = ''

    savedMemes.forEach((meme, index) => {
        const savedImg = document.createElement('img')
        savedImg.src = meme.url
        savedImg.addEventListener('click', () => onEditSavedMeme(index))

        savedSection.appendChild(savedImg)
    })
}

function onEditSavedMeme(index) {
    const savedMemes = getSavedMemes()
    const memeToEdit = savedMemes[index]

    loadMemeForEditing(memeToEdit)
    renderMeme()
    onChangeToSection('editor')
}

function updateKeywordsList() {
    const datalist = document.getElementById('keywords')
    const uniqueKeywords = getUniqueKeywords(gImgs)

    datalist.innerHTML = '';
    uniqueKeywords.forEach(keyword => {
        const option = document.createElement('option');
        option.value = keyword;
        datalist.appendChild(option);
    });
}

function onImgInput(ev) {
    loadImageFromInput(ev, renderImg)
    onChangeToSection('editor')
}

function loadImageFromInput(ev, onImageReady) {
    const reader = new FileReader()
    reader.onload = function (event) {
        let img = new Image()
        img.src = event.target.result
        img.onload = () => {
            setImg(onAddNewImg(img))
            onImageReady(img)
            onSelectImg(img)
            renderGallery()
        }
    }
    reader.readAsDataURL(ev.target.files[0])
}

function onAddNewImg(img) {
    return addNewImg(img)
}

function renderImg(img) {
    gCtx.drawImage(img, 0, 0, gElCanvas.width - 1, gElCanvas.height - 1)
}

function onSelectImg(elImg) {
    coverCanvasWithImg(elImg)
}

function coverCanvasWithImg(elImg) {
    gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}

