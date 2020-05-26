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
    // add task event
    form.addEventListener("submit", addTask);
    // remove task event 
    taskList.addEventListener("click", removeTask);
    // clear task eevnt
    clearBtn.addEventListener("click", clearTasks);
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

    // clear input
    taskInput.value = "";

    e.prevenetDefault();
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