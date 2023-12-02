'use strict'


// gallery controller
function setImg(imgId) {
    gMeme.selectedImgId = imgId
}

// gallery controller
function saveMeme(meme) {
    const savedMemes = getSavedMemes()
    savedMemes.push(meme)
    saveToStorage('savedMemes', savedMemes)
}

// gallery controller
function getSavedMemes() {
    return loadFromStorage('savedMemes') || []
}

// gallery controller
function removeSavedMeme(index) {
    const savedMemes = getSavedMemes()
    savedMemes.splice(index, 1)
    saveToStorage('savedMemes', savedMemes)
}

// gallery controller
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
