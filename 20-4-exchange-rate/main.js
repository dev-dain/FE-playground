const cOne = document.getElementById('currency-one');
const cTwo = document.getElementById('currency-two');
const aOne = document.getElementById('amount-one');
const aTwo = document.getElementById('amount-two');
const swapBtn = document.getElementById('swap');
const rateText = document.getElementById('rate');
let swapText = '';

function calculate() {
    const cOneValue = cOne.value;
    const cTwoValue = cTwo.value;

    //ajax 구현하는 최신 방법인 fetch를 쓰자
    //서버에게 fetch() 안의 URL 내용을 응답해달라고 요청
    fetch(`https://api.exchangerate-api.com/v4/latest/${cOneValue}`)
        /*
            fetch 밑에 다른 걸 써두면 브라우저가 요청을 받을 때까지
            그 밑의 문장을 실행하게 됨. 이 예제에선 필요없어서 없음
            비동기적 방식
            response 객체는 HTTP Response이기 때문에
            데이터를 가져오려면 일단 json() 메소드를 써야 함 
        */
        .then(res => res.json())
        .then(data => {
            console.log(data);
            //서버가 응답한 데이터는 data라는 변수 안에 있음
            //서버 응답이 끝나면 두 번째 then에 등록된 콜백함수가 실행됨
            //fetch API가 실행되면 이 콜백함수 첫 번째 인자에 response 객체를 줌
            const rate = data.rates[cTwoValue];
            rateText.innerText = `1 ${cOneValue} = ${rate} ${cTwoValue}`;
            aTwo.value = (aOne.value * rate).toFixed(2);
        });
}

//change 이벤트는 변동이 있을 때 발생
cOne.addEventListener('change', calculate);
//input 이벤트는 <input>, <textarea> 등의 요소 값이 변경됐을 때 발생
aOne.addEventListener('input', calculate);
cTwo.addEventListener('change', calculate);
aTwo.addEventListener('input', calculate);

swapBtn.addEventListener('click', function() {
    swapText = cOne.value;
    cOne.value = cTwo.value;
    cTwo.value = swapText;
    calculate();
})

calculate();