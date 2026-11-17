
let tasks = [];

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

const totalCount = document.getElementById("totalCount");
const pendingCount = document.getElementById("pendingCount");
const completedCount = document.getElementById("completedCount");

const clearBtn = document.getElementById("clearBtn");

// Update task counts
function updateStats() {

    let total = tasks.length;

    let completed = tasks.filter(
        task => task.completed === true
    ).length;

    let pending = total - completed;

    totalCount.innerText = total;
    pendingCount.innerText = pending;
    completedCount.innerText = completed;
}

// Display tasks
function displayTasks() {

    taskList.innerHTML = "";

    tasks.forEach(function(task, index) {

        let li = document.createElement("li");

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        checkbox.addEventListener("change", function() {

            tasks[index].completed = checkbox.checked;

            displayTasks();

        });

        let span = document.createElement("span");
        span.innerText = task.name;

        if (task.completed) {
            span.style.textDecoration = "line-through";
        }

        let deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete";

        deleteBtn.addEventListener("click", function() {

            tasks.splice(index, 1);

            displayTasks();

        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);

    });

    updateStats();
}

// Add new task
function addTask() {

    let taskName = taskInput.value.trim();

    if (taskName === "") {

        alert("Please enter a task!");

        return;
    }

    tasks.push({

        name: taskName,
        completed: false

    });

    taskInput.value = "";

    displayTasks();
}

// Add button click
addBtn.addEventListener("click", addTask);

// Enter key support
taskInput.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {

        addTask();

    }

});

// Delete all tasks
clearBtn.addEventListener("click", function() {

    tasks = [];

    displayTasks();

});

// Initial display
displayTasks();
