let editIndex = null;

document.getElementById('add').addEventListener('click', function () {
    const taskInput = document.getElementById('taskInput').value;
    let taskss = JSON.parse(localStorage.getItem('tasks')) || [];

    if (taskInput.trim() === '') {
        alert('Please enter a task.');
        return;
    }

    if (editIndex !== null) {
        taskss[editIndex].task = taskInput;
        localStorage.setItem('tasks', JSON.stringify(taskss));
        document.getElementById('taskInput').value = '';
        document.getElementById('add').innerText = 'Add';
        editIndex = null;
        alert('Task updated successfully!');
        populateTasks();
    } else {
        const tasks = {
            task: taskInput
        };
        taskss.push(tasks);
        localStorage.setItem('tasks', JSON.stringify(taskss));
        document.getElementById('taskInput').value = '';
        alert('Task added successfully!');
        populateTasks();
    }
});

function populateTasks() {
    const taskss = JSON.parse(localStorage.getItem('tasks')) || [];
    const tasksContainer = document.getElementById('tasksContainer');
    tasksContainer.innerHTML = '';
    taskss.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <ul class="list-unstyled d-flex mb-3 align-items-center task-item border-bottom pb-2 w-100">
                <input type="checkbox" class="form-check-input me-4 mb-1 border-1 border-primary" ${task.completed ? "checked" : " "} onclick="toggleTask(${index})">
                <li class="me-3 ${task.completed ? "text-decoration-line-through" : " "}" >${task.task}</li>
                <div class="dropdown ms-auto align-self-start">
                    <button type="button" data-bs-toggle="dropdown" class="border-0 bg-white" aria-expanded="false">
                      <i class="bi bi-three-dots"></i>
                    </button>
                    <ul class="dropdown-menu">
                      ${!task.completed
                ? `<li><button class="btn w-100" onclick="edittasks(${index})">Edit</button></li>`
                : ""
            }
                      <li><button class="btn w-100" onclick="removetasks(${index})">Remove</button></li>
                    </ul>
                </div>
            </ul>
        `;
        tasksContainer.appendChild(li);
    });
    document.getElementById('taskCount').innerText = taskss.length + ' Tasks';
}

function toggleTask(index) {
    const taskss = JSON.parse(localStorage.getItem('tasks')) || [];
    taskss[index].completed = !taskss[index].completed;
    localStorage.setItem('tasks', JSON.stringify(taskss));
    populateTasks();
}
document.getElementById('All').addEventListener('click', function () {
    populateTasks();
});
document.getElementById('completed').addEventListener('click', function () {
    const taskss = JSON.parse(localStorage.getItem('tasks')) || [];
    const completedTasks = taskss.filter(task => task.completed);
    const tasksContainer = document.getElementById('tasksContainer');
    tasksContainer.innerHTML = '';
    completedTasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <ul class="list-unstyled d-flex mb-3 align-items-center task-item border-bottom pb-2 w-100">
                <input type="checkbox" class="form-check-input me-4 mb-1 border-1 border-primary" ${task.completed ? "checked" : " "} onclick="toggleTask(${index})">
                <li class="me-3 ${task.completed ? "text-decoration-line-through" : " "}" >${task.task}</li>
                <div class="dropdown ms-auto align-self-start">
                    <button type="button" data-bs-toggle="dropdown" class="border-0 bg-white" aria-expanded="false">
                        <i class="bi bi-three-dots"></i>
                    </button>
                    <ul class="dropdown-menu">
                      ${!task.completed
                ? `<li><button class="btn w-100" onclick="edittasks(${index})">Edit</button></li>`
                : ""
            }
                        <li><button class="btn w-100" onclick="removetasks(${index})">Remove</button></li>
                    </ul>
                </div>
            </ul>
        `;
        tasksContainer.appendChild(li);
    });
    document.getElementById('taskCount').innerText = taskss.length + ' ' + 'Tasks' + ' ' + completedTasks.length + ' ' + ' Done';
}
);
document.getElementById('Pending').addEventListener('click', function () {
    const taskss = JSON.parse(localStorage.getItem('tasks')) || [];
    const pendingTasks = taskss.filter(task => !task.completed);
    const tasksContainer = document.getElementById('tasksContainer');
    tasksContainer.innerHTML = '';
    pendingTasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <ul class="list-unstyled d-flex mb-3 align-items-center task-item border-bottom pb-2 w-100">
                <input type="checkbox" class="form-check-input me-4 mb-1 border-1 border-primary" ${task.completed ? "checked" : " "} onclick="toggleTask(${index})">
                <li class="me-3 ${task.completed ? "text-decoration-line-through" : " "}" >${task.task}</li>
                <div class="dropdown ms-auto align-self-start">
                    <button type="button" data-bs-toggle="dropdown" class="border-0 bg-white" aria-expanded="false">
                        <i class="bi bi-three-dots"></i>
                    </button>
                    <ul class="dropdown-menu">
                      ${!task.completed
                ? `<li><button class="btn w-100" onclick="edittasks(${index})">Edit</button></li>`
                : ""
            }
                        <li><button class="btn w-100" onclick="removetasks(${index})">Remove</button></li>
                    </ul>
                </div>
            </ul>
        `;
        tasksContainer.appendChild(li);
    }
    );
    document.getElementById('taskCount').innerText = taskss.length + ' ' + 'Tasks' + ' ' + pendingTasks.length + ' Pending';
}
);
document.getElementById('clearAll').addEventListener('click', function () {
    const taskss = JSON.parse(localStorage.getItem('tasks')) || [];
    if (taskss.length === 0) {
        alert('All tasks are already cleared.');
        return;
    }
    const confirmed = confirm('Are you sure you want to clear all tasks?');
    if (confirmed) {
        localStorage.removeItem('tasks');
        populateTasks();
    }
    else {
        return;
    }
});
function edittasks(index) {
    const taskss = JSON.parse(localStorage.getItem('tasks')) || [];
    const taks = taskss[index];
    document.getElementById('taskInput').value = taks.task;
    editIndex = index;
    document.getElementById('add').innerText = 'Update';
}
function removetasks(index) {
    const confirmed = confirm('Are you sure you want to remove this task?');
    if (confirmed) {
        const taskss = JSON.parse(localStorage.getItem('tasks')) || [];
        taskss.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(taskss));
        populateTasks();
    }
    else {
        return;
    }
}
window.onload = populateTasks;