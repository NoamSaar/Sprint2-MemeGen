'use strict'


function renderGallery() {
    const images = getImages()

    var strHtml = images.map(img => `
        <img data-img-id="${img.id}" onclick="onImgSelect(${img.id})" src="img/${img.id}.jpg" alt=""></img>
    `).join('')

    document.querySelector('.images-container').innerHTML = strHtml
}

function onImgSelect(imgId) {
    setImg(imgId)
}
