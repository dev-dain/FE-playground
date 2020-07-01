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

function start() {
  clock();
  setInterval(clock, 1000);
}

window.onload = start();