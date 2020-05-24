const modal = document.getElementById('modal');
const modalContent = document.querySelector('.modal-content');
const imgContainer = document.getElementById('img-container');
const close = document.querySelector('.close');
const newImg = document.createElement('img');
const newImgAnchor = document.createElement('a');
let elemTop = 0;
let elemBottom = 0;
let avrgPadding = 0;

imgContainer.addEventListener('click', function(e) {
    if (e.target.nodeName === 'IMG') {
        modal.style.display = 'block';
        newImgAnchor.href = e.target.src;
        newImgAnchor.title = e.target.alt;
        newImgAnchor.target = '_blank';
        newImg.src = e.target.src;
        newImg.alt = e.target.alt;
        modal.height = document.body.scrollHeight;

        elemTop = window.pageYOffset;
        avrgPadding = 
                (e.target.getBoundingClientRect().top + 
                e.target.getBoundingClientRect().bottom) / 2;
        elemTop += avrgPadding;
        elemBottom = document.body.scrollHeight - elemTop - (newImg.height*0.8);
        modalContent.style.paddingTop = elemTop+'px';
        modalContent.style.paddingBottom = elemBottom+'px';

        newImgAnchor.appendChild(newImg);
        modalContent.appendChild(newImgAnchor);
    }
});

close.addEventListener('click', function() {
    modal.style.display = 'none';
    modalContent.removeChild(newImgAnchor);
});