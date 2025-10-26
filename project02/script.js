let tasks = [];

document.getElementById("taskForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.getElementById("taskTitle").value;
    const priority = document.getElementById("taskPriority").value;

    const radios = document.getElementsByName("status");
    let status = "";
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            status = radios[i].value;
            break;
        }
    }

    if (title === "") {
        alert("Please enter a task title.");
        return;
    }

    const task = {
        title: title,
        priority: priority,
        status: status
    };

    tasks.push(task);

    displayTasks();

    document.getElementById("taskTitle").value = "";
    document.getElementById("taskPriority").value = "Low";
    radios[0].checked = true;
});

function displayTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    for (let i = 0; i < tasks.length; i++) {
        const li = document.createElement("li");
        li.className = "task-item";

        const info = document.createElement("div");
        info.innerHTML = "<strong>" + tasks[i].title + "</strong>" +
            " | Priority: " + tasks[i].priority +
            " | Status: " + tasks[i].status;

        if (tasks[i].status === "Completed") {
            info.style.textDecoration = "line-through";
            info.style.color = "gray";
        }
        li.appendChild(info);

        const btnDiv = document.createElement("div");
        btnDiv.className = "task-buttons";

        const completeBtn = document.createElement("button");
        completeBtn.innerText = "Mark Complete";
        completeBtn.onclick = function () {
            markComplete(i);
        };
        btnDiv.appendChild(completeBtn);

        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete";
        deleteBtn.onclick = function () {
            deleteTask(i);
        };
        btnDiv.appendChild(deleteBtn);

        li.appendChild(btnDiv);
        taskList.appendChild(li);
    }
}

function markComplete(index) {
    tasks[index].status = "Completed";
    displayTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    displayTasks();
}
