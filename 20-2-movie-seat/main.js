const container = document.querySelector('.container');
const seatArr = document.querySelectorAll('.row .seat:not(.occupied');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

//이게 ticketPrice 밑에 있으면 제대로 계산이 안 됨
populateUI();

let ticketPrice = +movieSelect.value;

//몇 번째 영화를 선택했고 얼마인지 체크
function setMovieData(movieIdx, moviePrice) {
    localStorage.setItem('selectedMovieIdx', movieIdx);
    localStorage.setItem('selectedMovePrice', moviePrice);
}

//얼마나 선택됐는지 확인
function updateSelectedCount() {
    //선택된 좌석들을 모두 고름
    const selected = document.querySelectorAll('.row .seat.selected');
    //선택된 좌석들의 위치를 잡음 (occupied인 것들은 건너뛰고 셈)
    //일단 selected인 것들을 모두 골라서 전체 seat에서 selected만
    //indexOf(seat)를 해서 담음
    const seatIdx = [...selected].map(seat => [...seatArr].indexOf(seat));
    //그래서 seatIdx는 array 형태
    console.log(seatIdx);

    //localStorage에 'selected'란 이름으로 value는 seatIdx를 줌
    localStorage.setItem('selected', JSON.stringify(seatIdx));
    //선택된 갯수는 sSCount에 저장
    const selectedSeatsCount = selected.length;
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

//populateUI는 최초 페이지가 켜졌을 때만 실행됨
//이건 이전에 얼마나 선택하고 닫았는지 확인하려고 하는 거
function populateUI() {
    //selected 배열을 받음
    const selected = JSON.parse(localStorage.getItem('selected'));
    console.log(selected);
    //만약 selected된 게 하나라도 있다면
    if (selected !== null && selected.length > 0) {
        //그 좌석들에 selected 클래스를 붙여줌
        //이 코드가 없으면 localStorage 쓸 이유가 없음
        seatArr.forEach((seat, index) => {
            if (selected.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }

    //이전에 무슨 영화를 골랐는지 확인
    const selectedMovieIdx = localStorage.getItem('selectedMovieIdx');

    //이전에 뭔가 골랐다면
    if (selectedMovieIdx !== null) {
        //그 영화의 인덱스로 value를 맞춰둠
        //select 요소의 selectedIndex 값을 맞춤
        //이게 없으면 이전에 선택한 영화가 뭔지 기억하지 않음
        movieSelect.selectedIndex = selectedMovieIdx;
    }
}

//영화를 고를 때 실행됨
movieSelect.addEventListener('change', e => {
    //티켓 가격을 바꿈
    ticketPrice = +e.target.value;
    //현재 선택된 영화 정보로 바꿈
    setMovieData(e.target.selectedIndex, e.target.value);
    //좌석 상황 업데이트
    updateSelectedCount();
});

//좌석을 고를 때 실행됨
container.addEventListener('click', e => {
    //seat 클래스이고 occupied가 아닌 것일 때(=선택 가능한 좌석일 때)
    if (
        e.target.classList.contains('seat') &&
        !e.target.classList.contains('occupied')
    ) {
        //classList.toggle()은 클래스값이 있는지 체크하고
        //없으면 더하고 있으면 제거함
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
});

updateSelectedCount();