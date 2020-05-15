const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const pw = document.getElementById('pw');
const cPw = document.getElementById('confirm-pw');

function showError(input, msg) {
    //이 함수는 부모 엘리먼트에 error 추가 후 에러 메시지 할당
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = msg;
}

function showSuccess(input) {
    /*
        parentElement를 선택하면 노드의 parent 요소를 선택하게 됨
        parentNode와 거의 비슷하지만, parentNode가 요소가 아닐 경우
        parentElement는 null
        parentElement는 부모 노드가 없을 때 null, parentNode는 document node return
    */
    //이 함수는 단순히 부모 엘리먼트인 form-control에 success 클래스도 추가함
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

function getFieldName(input) {
    //input 태그의 name을 돌려주는 함수 (한글로 돌려줘야해서)
    return input.name;
}

function checkPWMatch(pw, cPw) {
    //단순히 비밀번호 두 개를 비교해보는 함수
    if (pw.value !== cPw.value) {
        showError(cPw, '비밀번호가 맞지 않습니다.');
    }
}

function checkEmail(input) {
    //정규식을 이용해 이메일인지 아닌지 체크하는 함수
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
      showSuccess(input);
    } else {
      showError(input, '이메일 형식에 맞지 않습니다.');
    }
  }

function checkLength(input, min, max) {
    //input 입력과 최소, 최대 자릿수를 받아 검사하는 함수
    if (input.value.length < min) {
        showError(
            input,
            `${getFieldName(input)}은(는) 최소 ${min}자리여야 합니다.`
        );
    } else if (input.value.length > max) {
        showError(
            input,
            `${getFieldName(input)}은(는) 최대 ${max}자리여야 합니다.`
        );
    } else {
        showSuccess(input);
    }
}

function checkRequired(inputArr) {
    //input 배열들이 비어있는지 확인하는 함수
    inputArr.forEach(function(input) {
        //trim()은 문자열 좌우 공백을 제거함
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)}은 필수입니다.`);
        } else {
            showSuccess(input);
        }
    })
}

form.addEventListener('submit', function(e) {
    //여기서 preventDefault는 submit을 중단함.
    //form 고유의 동작을 중단시키는 역할임 (현재 이벤트의 기본 동작 중단)
    //이건 뭐 상위 DOM 이런 거랑은 하등 관계없고 기본기능 중단 역할임
    e.preventDefault();

    checkRequired([username, email, pw, cPw]);
    checkLength(username, 3, 15);
    checkLength(pw, 6, 25);
    checkEmail(email);
    checkPWMatch(pw, cPw);
})

/*
  참고
  https://pa-pico.tistory.com/20
  https://programmingsummaries.tistory.com/313
  https://grace-go.tistory.com/79
*/