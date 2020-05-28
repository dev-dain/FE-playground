const modal = document.getElementById('modal');
const modalContent = document.querySelector('.modal-content');
const imgContainer = document.getElementById('img-container');
const close = document.querySelector('.close');
const newImgAnchor = document.createElement('a');
const newImg = document.createElement('img');
let elemTop = 0;
let avrgPadding = 0;

imgContainer.addEventListener('click', function(e) {
    if (e.target.nodeName === 'IMG') {
        modal.style.display = 'block';
        modal.classList.toggle('grayBlur');
        newImgAnchor.href = e.target.src;
        newImgAnchor.title = e.target.alt;
        newImgAnchor.target = '_blank';
        newImg.src = e.target.src;
        newImg.alt = e.target.alt;

        elemTop = window.pageYOffset;
        avrgPadding = 
            (e.target.getBoundingClientRect().top + 
            e.target.getBoundingClientRect().bottom) / 2;
        elemTop += avrgPadding;
        modalContent.style.paddingTop = elemTop+'px';
        newImgAnchor.appendChild(newImg);
        modalContent.appendChild(newImgAnchor);
    }
});
close.addEventListener('click', function() {
    modal.style.display = 'none';
    modal.classList.toggle('grayBlur');
    modalContent.removeChild(newImgAnchor);
});