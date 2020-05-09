const timer = () => {
    const clock = document.querySelector('.clock');
    const today = new Date();
    clock.innerHTML = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
}

const start = () => {
    timer();
    setInterval(timer, 1000);
    
    const taskInput = document.querySelector('.inputTask');
    const addBtn = document.querySelector('.addTask');
    console.log(addBtn);
    taskInput.addEventListener('focus', function() {
        taskInput.classList = 'inputTask';
    })
    addBtn.addEventListener('click', function() {
        if (taskInput.value.length < 1) {
            taskInput.classList += ' input-null';
        }
    });
    window.addEventListener('keydown', function() {
        if (this.event.keyCode == 13) {
            if (taskInput.value.length < 1) {
                taskInput.classList += ' input-null';
            } else {
                taskInput.classList = 'inputTask';
            }
        }
    })
}

window.onload = start();