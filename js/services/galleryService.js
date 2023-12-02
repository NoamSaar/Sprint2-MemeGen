'use strict'

var gFilterBy = null

function getImages() {
    return gImgs
}

function getImagesToShow() {
    return gImgs.filter(img => {
        if (!gFilterBy) {
            return true
        }
        return img.keywords.includes(gFilterBy);
    })
}

function setFilterBy(filterBy) {
    gFilterBy = filterBy
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId
}

function saveSizeToStorage(filterName, size) {
    var sizes = getSizes() || {}
    sizes[filterName] = size
    saveToStorage('sizes', sizes)
}

function getSizes() {
    return loadFromStorage('sizes')
}

function saveMeme(meme) {
    const savedMemes = getSavedMemes()
    savedMemes.push(meme)
    saveToStorage('savedMemes', savedMemes)
}

function getSavedMemes() {
    return loadFromStorage('savedMemes') || []
}

function removeSavedMeme(index) {
    const savedMemes = getSavedMemes()
    savedMemes.splice(index, 1)
    saveToStorage('savedMemes', savedMemes)
}

function loadMemeForEditing(memeToEdit) {
    gMeme = memeToEdit
}

function addNewImg(img) {
    const newImgObj = {
        id: gImgs.length + 1,
        url: img.src,
        keywords: [],
    }

    gImgs.push(newImgObj)
    console.log('newImgObj.id:', newImgObj.id)
    return newImgObj.id
}
