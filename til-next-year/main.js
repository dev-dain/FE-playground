function clock() {
  const content = document.querySelector('h1');
  content.innerHTML = '';
  let today = new Date();
  const next_year = new Date(today.getFullYear() + 1, 0, 1, 0, 0, 0);
  let diff = next_year - today;
  let day = diff / (60 * 60 * 24 * 1000);
  let h = (day - parseInt(day)) * 24;
  let m = (h - parseInt(h)) * 60;
  let s = (m - parseInt(m)) * 60;

  content.innerHTML = 
    `${parseInt(diff / (60 * 60 * 24 * 1000))} 일 ${parseInt((day - parseInt(day)) * 24)} 시간  ` +
    `${parseInt((h - parseInt(h)) * 60)} 분  ${parseInt((m - parseInt(m)) * 60)} 초  `;
}

function displayBGImg(overlay, range) {
  let rangeVal = parseFloat(localStorage.getItem('range'));
  if (localStorage.getItem('range')) {
    overlay.style.backgroundColor = `rgba(0, 0, 0, ${rangeVal})`;
    range.value = rangeVal * 25;
  }
}

function start() {
  const fileInput = document.querySelector('.file-upload');
  const range = document.querySelector('.range');
  const wrap = document.getElementById('wrap');
  const overlay = document.querySelector('.overlay');
  const source = document.querySelector('.source');
  clock();
  setInterval(clock, 1000);
  displayBGImg(overlay, range);
  
  fileInput.addEventListener('change', function(e) {
    try {
      let tempPath = URL.createObjectURL(e.target.files[0]);
      wrap.style.backgroundImage = `url('${tempPath}')`;
      source.style.display = 'none';
    } catch {
      console.log('error!');
    }
  });
  range.addEventListener('change', function() {
    overlay.style.backgroundColor = `rgba(0, 0, 0, ${0.04 * range.value})`
    localStorage.setItem('range', 0.04 * range.value);
  });
}

window.onload = start();