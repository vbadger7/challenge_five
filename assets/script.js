// Open modal button
let openModalBtn = document.getElementById("createTaskBtn");
// Close modal button
let closeModalBtn = document.getElementsByClassName("close")[0];
// Modal
let modal = document.getElementById("myModal");
// Task form
let taskForm = document.getElementById("taskForm");
// Task columns
let notStartedColumn = document.getElementById("notStartedColumn");
let inProgressColumn = document.getElementById("inProgressColumn");
let completedColumn = document.getElementById("completedColumn");

// Open modal
openModalBtn.onclick = function() {
    modal.style.display = "block";
}

// Close modal
closeModalBtn.onclick = function() {
    modal.style.display = "none";
}


window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


taskForm.addEventListener("submit", function(event) {
    event.preventDefault();

    
    let taskId = "task-" + Date.now();

    let taskTitle = document.getElementById("taskTitle").value;
    let taskDueDate = document.getElementById("taskDueDate").value;
    let taskDescription = document.getElementById("taskDescription").value;

    
    let taskContainer = document.createElement("div");
    taskContainer.classList.add("task-container");

    
    let taskName = document.createElement("div");
    taskName.textContent = "Task: " + taskTitle;
    taskContainer.appendChild(taskName);

    
    let taskDate = document.createElement("div");
    taskDate.textContent = "Due Date: " + taskDueDate;
    taskContainer.appendChild(taskDate);

    
    let taskDesc = document.createElement("div");
    taskDesc.textContent = "Description: " + taskDescription;
    taskContainer.appendChild(taskDesc);

   
    let taskElement = document.createElement("div");
    taskElement.classList.add("task");
    taskElement.setAttribute("draggable", "true");
    taskElement.id = taskId; 
    taskElement.addEventListener("dragstart", function(event) {
        event.dataTransfer.setData("text/plain", taskId); 
    });

    let currentDate = new Date();
    let dueDate = new Date(taskDueDate);

    if (dueDate < currentDate) {
        taskElement.style.backgroundColor = "#ff7f7f"; 
    } else if ((dueDate - currentDate) / (1000 * 3600 * 24) <= 2) {
        taskElement.style.backgroundColor = "#ffff7f";
    }

    taskElement.appendChild(taskContainer);

    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("deleteable");
    deleteButton.onclick = function() {
        taskElement.remove();
    };
    taskContainer.appendChild(deleteButton);

    notStartedColumn.appendChild(taskElement);

    modal.style.display = "none";

    taskForm.reset();
});

function allowDrop(event) {
    event.preventDefault();
}

function drop(event, columnId) {
    event.preventDefault();
    let data = event.dataTransfer.getData("text/plain");
    let taskElement = document.getElementById(data);
    let targetColumn = document.getElementById(columnId);
    targetColumn.appendChild(taskElement);
}

notStartedColumn.addEventListener("dragover", allowDrop);
inProgressColumn.addEventListener("dragover", allowDrop);
completedColumn.addEventListener("dragover", allowDrop);

notStartedColumn.addEventListener("dragenter", function(event) {
    event.preventDefault();
    notStartedColumn.classList.add("drag-over");
});
notStartedColumn.addEventListener("dragleave", function(event) {
    event.preventDefault();
    notStartedColumn.classList.remove("drag-over");
});

inProgressColumn.addEventListener("dragenter", function(event) {
    event.preventDefault();
    inProgressColumn.classList.add("drag-over");
});
inProgressColumn.addEventListener("dragleave", function(event) {
    event.preventDefault();
    inProgressColumn.classList.remove("drag-over");
});

completedColumn.addEventListener("dragenter", function(event) {
    event.preventDefault();
    completedColumn.classList.add("drag-over");
});
completedColumn.addEventListener("dragleave", function(event) {
    event.preventDefault();
    completedColumn.classList.remove("drag-over");
});

notStartedColumn.addEventListener("drop", function(event) {
    drop(event, "notStartedColumn");
    notStartedColumn.classList.remove("drag-over");
});

inProgressColumn.addEventListener("drop", function(event) {
    drop(event, "inProgressColumn");
    inProgressColumn.classList.remove("drag-over");
});

completedColumn.addEventListener("drop", function(event) {
    drop(event, "completedColumn");
    completedColumn.classList.remove("drag-over");
});
