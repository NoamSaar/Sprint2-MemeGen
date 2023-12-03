'use strict'

const STORAGE_KEY = 'savedMemes'

var gImgs = [
    { id: 2, url: 'img/2.jpg', keywords: ['all', 'square', 'dogs', 'cute'] },
    { id: 1, url: 'img/1.jpg', keywords: ['all', 'square', 'trump', 'man'] },
    { id: 3, url: 'img/3.jpg', keywords: ['all', 'square', 'dogs', 'baby', 'cute', 'mood'] },
    { id: 4, url: 'img/4.jpg', keywords: ['all', 'square', 'cats', 'mood', 'cute'] },
    { id: 5, url: 'img/5.jpg', keywords: ['all', 'square', 'baby', 'mood', 'cute'] },
    { id: 6, url: 'img/6.jpg', keywords: ['all', 'square', 'tv', 'mood', 'man'] },
    { id: 7, url: 'img/7.jpg', keywords: ['all', 'square', 'baby', 'mood'] },
    { id: 8, url: 'img/8.jpg', keywords: ['all', 'square', 'tv', 'man'] },
    { id: 9, url: 'img/9.jpg', keywords: ['all', 'square', 'baby', 'mood', 'laugh', 'cute'] },
    { id: 10, url: 'img/10.jpg', keywords: ['all', 'square', 'obama', 'mood', 'laugh', 'man'] },
    { id: 11, url: 'img/11.jpg', keywords: ['all', 'square', 'fight', 'kiss', 'man'] },
    { id: 12, url: 'img/12.jpg', keywords: ['all', 'square', 'tv' ,'point', 'man'] },
    { id: 13, url: 'img/13.jpg', keywords: ['all', 'square', 'tv', 'cheers', 'man'] },
    { id: 14, url: 'img/14.jpg', keywords: ['all', 'square', 'tv', 'matrix', 'serious', 'man'] },
    { id: 15, url: 'img/15.jpg', keywords: ['all', 'square', 'tv', 'zero', 'man'] },
    { id: 16, url: 'img/16.jpg', keywords: ['all', 'square', 'tv', 'mood', 'laugh', 'man'] },
    { id: 17, url: 'img/17.jpg', keywords: ['all', 'square', 'putin', 'two', 'man'] },
    { id: 18, url: 'img/18.jpg', keywords: ['all', 'square', 'tv', 'toy'] },
    { id: 19, url: 'img/19.jpg', keywords: ['all', 'tv', 'mood', 'man'] },
    { id: 20, url: 'img/20.jpg', keywords: ['all', 'mood', 'happy', 'woman'] },
    { id: 21, url: 'img/21.jpg', keywords: ['all', 'trump', 'man'] },
    { id: 22, url: 'img/22.jpg', keywords: ['all', 'dogs', 'cute'] },
    { id: 23, url: 'img/23.jpg', keywords: ['all', 'baby', 'mood', 'cute'] },
    { id: 24, url: 'img/24.jpg', keywords: ['all', 'dogs', 'baby', 'cute', 'mood'] },
    { id: 25, url: 'img/25.jpg', keywords: ['all', 'cats', 'mood', 'cute'] },
    { id: 26, url: 'img/26.jpg', keywords: ['all', 'tv', 'man'] },
    { id: 27, url: 'img/27.jpg', keywords: ['all', 'baby', 'mood', 'laugh', 'cute'] },
    { id: 28, url: 'img/28.jpg', keywords: ['all', 'tv' ,'point', 'man'] },
    { id: 29, url: 'img/29.jpg', keywords: ['all', 'tv', 'mood', 'man'] },
    { id: 30, url: 'img/30.jpg', keywords: ['all', 'tv' ,'mood', 'man'] },
    { id: 31, url: 'img/31.jpg', keywords: ['all', 'baby', 'mood', 'happy', 'cute'] },
    { id: 32, url: 'img/32.jpg', keywords: ['all', 'trump', 'man'] },
    { id: 33, url: 'img/33.jpg', keywords: ['all', 'baby', 'mood', 'cute'] },
    { id: 34, url: 'img/34.jpg', keywords: ['all', 'dogs', 'puppy', 'cute'] },
    { id: 35, url: 'img/35.jpg', keywords: ['all', 'obama', 'mood', 'laugh', 'man'] },
    { id: 36, url: 'img/36.jpg', keywords: ['all', 'fight', 'kiss', 'man'] },
    { id: 37, url: 'img/37.jpg', keywords: ['all', 'tv', 'cheers', 'man'] },
    { id: 38, url: 'img/38.jpg', keywords: ['all', 'tv', 'matrix', 'serious', 'man'] },
    { id: 39, url: 'img/39.jpg', keywords: ['all', 'tv', 'zero', 'man'] },
]

var gFilterBy = null

function getImgs() {
    return gImgs
}

function getAllKeywords() {
    var uniqueKeywords = new Set()

    gImgs.forEach(img => {
        img.keywords.forEach(keyword => {
            uniqueKeywords.add(keyword.toLowerCase())
        })
    })

    return Array.from(uniqueKeywords)
}

function getImgsToShow() {
    return gImgs.filter(img => {
        if (!gFilterBy) return true

        return img.keywords.some(keyword => keyword.toLowerCase().includes(gFilterBy.toLowerCase()))
    })
}

function getRemainingKeywords(displayedKeywords) {
    const allKeywords = getAllKeywords()

    return allKeywords.filter(keyword => !displayedKeywords.includes(keyword))
}

function getSavedMemes() {
    return loadFromStorage(STORAGE_KEY) || []
}

function getFilterFontSizes() {
    return loadFromStorage('filter_font_size')
}

function setFilterBy(filterBy) {
    gFilterBy = filterBy
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId
}

function createNewImg(img) {
    const newImgObj = {
        id: gImgs.length + 1,
        url: img.src,
        keywords: [],
    }

    gImgs.push(newImgObj)
    console.log('newImgObj.id:', newImgObj.id)
    return newImgObj.id
}

function saveMeme(meme) {
    const savedMemes = getSavedMemes()
    savedMemes.push(meme)
    saveToStorage(STORAGE_KEY, savedMemes)
}

function loadMemeForEditing(memeToEdit) {
    gMeme = memeToEdit
}

// function removeSavedMeme(index) {
//     const savedMemes = getSavedMemes()
//     savedMemes.splice(index, 1)
//     saveToStorage(STORAGE_KEY, savedMemes)
// }

function _saveFilterToStorage(filterName, fontSize) {
    const filterFontSizes = getFilterFontSizes() || {}
    filterFontSizes[filterName] = fontSize
    saveToStorage('filter_font_size', filterFontSizes)
}

