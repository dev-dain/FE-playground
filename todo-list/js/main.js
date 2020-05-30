const taskList = document.querySelector('.task-list');
const doneList = document.querySelector('.task-list.done');

const timer = () => {
    const clock = document.querySelector('.clock');
    const today = new Date();
    let h = today.getHours();

    if (h == 0) {
        h = 12;
    }
    (h > 12) ? h = 'PM ' + (h-12) : h = 'AM ' + h;
    clock.innerHTML = 
        `${addZero(h)} : ${addZero(today.getMinutes())} : 
        ${addZero(today.getSeconds())}`;
}

const addZero = (num) => {
    (num < 10) ? num = '0' + num : num;
    return num;
}

class Task {
    constructor(task) {
        const taskDiv = document.createElement('li');
        const doneItem = document.createElement('button');
        const taskItem = document.createElement('div');
        const delItem = document.createElement('button');
        let flag = false;
    
        doneItem.classList = 'done-item';
        doneItem.innerHTML = '&#10003;';
        taskItem.classList = 'task-item';
        delItem.classList = 'del-item';
        delItem.innerHTML = '&#215;';
        taskItem.innerHTML = task;
        taskDiv.appendChild(doneItem);
        taskDiv.appendChild(taskItem);
        taskDiv.appendChild(delItem);
        taskDiv.classList = 'task';
        this._taskDiv = taskDiv;  
    }
    get makeTask() {
        return this._taskDiv;
    }
    get flagStatus() {
        return this._flag;
    }
    set reviseTask(task) {
        this._taskDiv.childNodes[1].innerHTML = task;
    }
    poleFlag() {
        this._flag = !(this._flag);
    }
}

const addTask = (task) => {
    const newTask = new Task(task);

    newTask.makeTask.childNodes[0].addEventListener('click', function() {
        if (!newTask.flagStatus) {
            newTask.makeTask.parentNode.removeChild(newTask.makeTask);
            newTask.makeTask.childNodes[0].classList += ' back';
            doneList.appendChild(newTask.makeTask);
        } else {
            newTask.makeTask.parentNode.removeChild(newTask.makeTask);
            newTask.makeTask.childNodes[0].classList = 'done-item';
            taskList.appendChild(newTask.makeTask);
        }
        newTask.poleFlag();
    });
    newTask.makeTask.childNodes[2].addEventListener('click', function() {
        newTask.makeTask.parentNode.removeChild(newTask.makeTask);
    });
    
    return newTask.makeTask;
}

const start = () => {
    timer();
    setInterval(timer, 1000);
    
    const taskInput = document.querySelector('.inputTask');
    const addBtn = document.querySelector('.addTask');
    const taskDelBtn = document.querySelector('.a-delete');
    const doneDelBtn = document.querySelector('.a-delete.done');

    taskInput.addEventListener('focus', function() {
        taskInput.classList = 'inputTask';
    });
    taskInput.addEventListener('blur', function() {
        taskInput.classList = 'inputTask';
    });
    taskInput.addEventListener('keydown', function() {
        if (window.event.keyCode == 13) {
            if (taskInput.value.length < 1) {
                taskInput.classList += ' input-null';
                taskInput.focus();
            } else {
                taskInput.classList = 'inputTask';
                const newTask = addTask(taskInput.value);
                taskList.appendChild(newTask);
                taskInput.value = '';
            }
        }
    });
    addBtn.addEventListener('click', function() {
        if (taskInput.value.length < 1) {
            taskInput.classList += ' input-null';
            taskInput.focus();
        } else {
            const newTask = addTask(taskInput.value);
            taskList.appendChild(newTask);
            taskInput.value = '';
        }
    });
    taskDelBtn.addEventListener('click', function() {
        taskList.innerHTML = '';
    });
    doneDelBtn.addEventListener('click', function() {
        doneList.innerHTML = '';
    });
}

window.onload = start();