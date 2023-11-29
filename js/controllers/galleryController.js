'use strict'


function renderGallery() {
    const images = getImages()

    var strHtml = images.map(img => `
        <img src="img/${img.id}.jpg" alt=""></img>
    `).join('')

    document.querySelector('.images-container').innerHTML = strHtml
}