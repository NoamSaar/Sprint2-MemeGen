'use strict'


function setImg(imgId) {
    gMeme.selectedImgId = imgId
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
