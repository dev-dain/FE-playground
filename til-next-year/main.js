const customPath = document.querySelector('.custom-path');
const range = document.querySelector('.range');
const wrap = document.getElementById('wrap');
const overlay = document.querySelector('.overlay');
const source = document.querySelector('.source');

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
    `${parseInt(diff / (60 * 60 * 24 * 1000)) + 1} 일 ${parseInt((day - parseInt(day)) * 24)} 시간  ` +
    `${parseInt((h - parseInt(h)) * 60)} 분  ${parseInt((m - parseInt(m)) * 60)} 초  `;
}

function displayBGImg() {
  let rangeVal;
  let pathVal;
  if (localStorage.getItem('range')) {
    rangeVal = parseFloat(localStorage.getItem('range'));
    overlay.style.backgroundColor = `rgba(0, 0, 0, ${rangeVal})`;
    range.value = rangeVal * 25;
  }
  if (localStorage.getItem('path')) {
    pathVal = localStorage.getItem('path');
    wrap.style.backgroundImage = `url('${pathVal}')`;
    customPath.value = pathVal;
    source.style.display = 'none';
  } else {
    wrap.style.backgroundImage = `url('https://images.unsplash.com/photo-1494783367193-149034c05e8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80')`;
    source.style.display = 'block';
  }
}

function start() {
  clock();
  setInterval(clock, 1000);
  displayBGImg(overlay, range, wrap);
  
  customPath.addEventListener('change', function(e) {
    if (customPath.value.trim() === '') {
      wrap.style.backgroundImage = `url('https://images.unsplash.com/photo-1494783367193-149034c05e8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80')`;
      source.style.display = 'block';
      localStorage.removeItem('path');
    } else {
      wrap.style.backgroundImage = `url('${customPath.value.trim()}')`;
      source.style.display = 'none';
      localStorage.setItem('path', customPath.value.trim());
    }
  });
  range.addEventListener('change', function() {
    overlay.style.backgroundColor = `rgba(0, 0, 0, ${0.04 * range.value})`
    localStorage.setItem('range', 0.04 * range.value);
  });
}

window.onload = start();