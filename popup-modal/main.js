const btnContainer = document.getElementById('btn-container');
const closeBtn = document.querySelector('.close');
const modal = document.querySelector('.modal figure');

btnContainer.addEventListener('click', function(e) {
    if (e.target.value === 'popup') {
        window.open('popup.html', '팝업창',
        'width=300, height=300, fullscreen=no, location=no');
    } else if (e.target.value === 'modal') {
        modal.style.display = 'flex';
    }
});

closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
})