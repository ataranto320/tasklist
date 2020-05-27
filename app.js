// define UI variables
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// load all event listeners 
loadEventListeners();

// load all event listeners
function loadEventListeners() {
    // DOM load event
    document.addEventListener("DOMContentLoaded", getTasks);
    // add task event
    form.addEventListener("submit", addTask);
    // remove task event 
    taskList.addEventListener("click", removeTask);
    // clear task eevnt
    clearBtn.addEventListener("click", clearTasks);
    // filter tasks event
    filter.addEventListener("keyup", filterTasks);
}

// get tasks from local storage
function getTasks() {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach(function(task) {
        // create li element
    const li = document.createElement("li");
    // add class
    li.className = "collection-item";
    // create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // create new link element 
    const link = document.createTextNode("a");
    // add class
    link.className = "delete-item secondary-content";
    // add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // append the link to li
    li.appendChild(link);

    // append li to ul
    taskList.appendChild(li);
    });
}

// add task
function addTask(e) {
    if(taskInput.value === "") {
        alert("add a task");
    }

    // create li element
    const li = document.createElement("li");
    // add class
    li.className = "collection-item";
    // create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // create new link element 
    const link = document.createTextNode("a");
    // add class
    link.className = "delete-item secondary-content";
    // add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // append the link to li
    li.appendChild(link);

    // append li to ul
    taskList.appendChild(li);
    // console.log(li);

    // store to local stprage
    storeTaskInLocalstorage(taskInput.value);

    // clear input
    taskInput.value = "";

    e.prevenetDefault();
}

// store task 
// can only store strings
function storeTaskInLocalstorage(task) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// remove task
function removeTask(e) {
    if (e.target.parentElement.classList.contains("delete-item")) {
        // console.log(e.target);
        if (confirm("Are you sure?")) {
            e.target.parentElement.parentElement.remove();
        }
    }
}

// clear tasks
function clearTasks() {
    // option 1
    // taskList.innerHTML = '';

    // option 2 (faster)
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    // for note
    // https://jsperf.com/innerhtml-vs-removechild
}

// filter tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    // console.log(text);
    document.querySelectorAll(".collection-item").forEach(
        function(task) {
            const item = task.firstChild.textContent;
            if (item.toLowerCase9.indexOf(text) != -1) {
                task.style.display = "block";
            } else {
                task.style.display = "none";
            }
        }
    );
}