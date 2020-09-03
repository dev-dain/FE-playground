const taskList = document.querySelector('.task-list');
const doneList = document.querySelector('.task-list.done');
let taskStorage = JSON.parse(localStorage.getItem('taskList')) || [];
let doneStorage = JSON.parse(localStorage.getItem('doneList')) || [];

const timer = () => {
  const clock = document.querySelector('.clock');
  const today = new Date();
  let h = today.getHours();

  if (h == 0) {
    h = 12;
  }
  (h > 12) ? h = 'PM ' + (h - 12) : h = 'AM ' + h;
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
    const taskName = task;
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
  get task() {
    return this.taskName;
  }
  poleFlag() {
    this._flag = !(this._flag);
  }
}

const addTask = (task, pole) => {
  const newTask = new Task(task);

  if (pole) 
    newTask.poleFlag();

  newTask.makeTask.childNodes[0].addEventListener('click', function () {
    if (!newTask.flagStatus) {
      newTask.makeTask.parentNode.removeChild(newTask.makeTask);
      newTask.makeTask.childNodes[0].classList += ' back';
      doneList.appendChild(newTask.makeTask);
      
      taskStorage.splice(taskStorage.indexOf(task), 1);
      localStorage.setItem('taskList', JSON.stringify(taskStorage));
      doneStorage.push(task);
      localStorage.setItem('doneList', JSON.stringify(doneStorage));
    
    } else {
      newTask.makeTask.parentNode.removeChild(newTask.makeTask);
      newTask.makeTask.childNodes[0].classList = 'done-item';
      taskList.appendChild(newTask.makeTask);
      
      doneStorage.splice(doneStorage.indexOf(task), 1);
      localStorage.setItem('doneList', JSON.stringify(doneStorage));
      taskStorage.push(task);
      localStorage.setItem('taskList', JSON.stringify(taskStorage));
    
    }
    newTask.poleFlag();
  });

  newTask.makeTask.childNodes[2].addEventListener('click', function () {
    if (newTask.makeTask.parentNode === taskList) {
      taskStorage.splice(taskStorage.indexOf(task), 1);
      localStorage.setItem('taskList', JSON.stringify(taskStorage));
    } else {
      doneStorage.splice(doneStorage.indexOf(task), 1);
      localStorage.setItem('doneList', JSON.stringify(doneStorage));
    }
    newTask.makeTask.parentNode.removeChild(newTask.makeTask);
  });

  return newTask.makeTask;
}

const start = () => {
  timer();
  setInterval(timer, 1000);

  if (localStorage.getItem('taskList')) {
    taskStorage.forEach(val => {
      const newTask = addTask(val);
      taskList.appendChild(newTask);
    });
  }
  if (localStorage.getItem('doneList')) {
    doneStorage.forEach(val => {
      const newTask = addTask(val, 1);
      doneList.appendChild(newTask);
      newTask.childNodes[0].classList += ' back';
    });
  }

  const taskInput = document.querySelector('.inputTask');
  const addBtn = document.querySelector('.addTask');
  const taskDelBtn = document.querySelector('.a-delete');
  const doneDelBtn = document.querySelector('.a-delete.done');

  taskInput.addEventListener('focus', function () {
    taskInput.classList = 'inputTask';
  });
  
  taskInput.addEventListener('blur', function () {
    taskInput.classList = 'inputTask';
  });
  
  taskInput.addEventListener('keydown', function () {
    if (window.event.keyCode == 13) {
      if (taskInput.value.length < 1) {
        taskInput.classList += ' input-null';
        taskInput.focus();
      
      } else {
        taskInput.classList = 'inputTask';
        const newTask = addTask(taskInput.value);
        taskList.appendChild(newTask);
        taskStorage.push(taskInput.value);
        localStorage.setItem('taskList', JSON.stringify(taskStorage));
        taskInput.value = '';
      }
    }
  });
  
  addBtn.addEventListener('click', function () {
    if (taskInput.value.length < 1) {
      taskInput.classList += ' input-null';
      taskInput.focus();
    
    } else {
      const newTask = addTask(taskInput.value);
      taskList.appendChild(newTask);
      taskStorage.push(taskInput.value);
      localStorage.setItem('taskList', JSON.stringify(taskStorage));
      taskInput.value = '';
    }
  });
  
  taskDelBtn.addEventListener('click', function () {
    taskList.innerHTML = '';
    taskStorage = [];
    localStorage.removeItem('taskList');
  });
  
  doneDelBtn.addEventListener('click', function () {
    doneList.innerHTML = '';
    doneStorage = [];
    localStorage.removeItem('doneList');
  });
}

window.onload = start();