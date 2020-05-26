const toggleBtn = document.getElementById('toggle');
const showModalBtn = document.getElementById('show-modal');
const modal = document.getElementById('modal');
const closeBtn = document.getElementById('close');

toggleBtn.addEventListener('click', function() {
    document.body.classList.toggle('show-nav');
});

showModalBtn.addEventListener('click', function() {
    modal.classList.add('show-modal');
});

closeBtn.addEventListener('click', function() {
    modal.classList.remove('show-modal');
});

window.addEventListener('click', e => {
    //e가 modal-header거나 modal-content일 경우 해당 안됨
    e.target == modal ? modal.classList.remove('show-modal') : false;
});