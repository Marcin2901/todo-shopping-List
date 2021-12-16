const taksTitle = document.getElementById('taksTitle');
const taskDesc = document.getElementById('taskDesc');
const addTaskBtn  = document.getElementById('addTaskBtn');
const taskList = document.querySelector('.todo-list__content');

let tasks = [];
class Task {
    constructor(taskName,  taskD) {
        this.taskName = taskName;
        this.taskD = taskD;
    }
}

function generateTask() {
    taskList.innerHTML = "";
    if(JSON.parse(localStorage.getItem('tasks'))) {
         tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    let taskHTML = "";
    for(let task of tasks) {
        taskHTML = `<h2>${task.taskName}</h2>
                    <p>${task.taskD}</p>
                    <span class="edit">Edit</span>
                    <span class="delete">Delete</span>`
        
        
        const taskWrapper = document.createElement('div');
        taskWrapper.innerHTML = taskHTML;
        taskList.appendChild(taskWrapper);

        taskWrapper.children[2].addEventListener('click', () => editTask(task));
        taskWrapper.children[3].addEventListener('click', () => deleteTask(task))

    }
}

generateTask();

addTaskBtn.addEventListener('click', () => {
    let newTask = new Task(taksTitle.value, taskDesc.value);
    tasks.push(newTask);
     localStorage.setItem('tasks', JSON.stringify(tasks));
    resetField();
    generateTask();
})

function resetField() {
    taksTitle.value = "";
    taskDesc.value = "";
}

function editTask(task) {
    const overlay = createOverlayWithEditModal(task)

    const confirmEditBtn = document.getElementById('confirmEdit');

    confirmEditBtn.addEventListener('click', () => {
        confirmChange(task, overlay)      
        localStorage.setItem('tasks', JSON.stringify(tasks));
        generateTask();
    })

}


function createOverlayWithEditModal(task) {
    const overlay = document.createElement('div');
    overlay.innerHTML = `
        <div>
            <label>Title</label>
            <input id="editedTaskName" type="text" value=${task.taskName}>
        </div>
        <div>
            <label>Description</label>
            <textarea id="editedTaskD">${task.taskD}</textarea>
            <button id="confirmEdit">Edit</button
        </div>
    `
    overlay.classList.add("edit-modal");
    document.body.appendChild(overlay);
    return overlay;
}

function confirmChange(task, overlay) {
    let editedTaskName = document.getElementById("editedTaskName");
    let editedTaskD = document.getElementById("editedTaskD");
    task.taskName = editedTaskName.value;
    task.taskD = editedTaskD.value;
    document.body.removeChild(overlay);
}



function deleteTask(task) {
    taskIndex = tasks.indexOf(task);
    tasks.splice(taskIndex, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    generateTask();
}