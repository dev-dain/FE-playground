const imgArr = document.querySelectorAll('img');

console.log('hi');

function resizeHeight(item) {
    item.height = item.width;
}

imgArr.forEach(function (item) {
    item.height = item.width;
});

window.addEventListener('resize', function() {
    imgArr.forEach(function (item) {
        item.height = item.width;
    });
});