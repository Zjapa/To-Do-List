const addBtn = document.querySelector(".button");
const inputTask = document.querySelector(".task-input");
const taskList = document.querySelector(".task-list");
const btnIcon = document.querySelector(".plus-icon");

const taskListChildren = taskList.children;

let clicked = false;
getTasks();
// INPUT ANIMATION
addBtn.addEventListener("click", (e) => {
  if (!clicked) {
    btnIcon.innerHTML = `<i class="fas fa-minus"></i>`;
    inputTask.style.width = "280px";
    inputTask.style.marginLeft = "20px";
    clicked = true;
  } else {
    btnIcon.innerHTML = `<i class="fas fa-plus"></i>`;
    inputTask.style.width = "0px";
    inputTask.style.marginLeft = "0px";
    clicked = false;
  }
});

inputTask.addEventListener("click", (e) => {
  e.stopPropagation();
});

// CHECK IF ENETER HAS CLICKED AND ADD TASK
inputTask.addEventListener("keypress", (e) => {
  if (e.code === "Enter") {
    if (inputTask.value === "") {
      alert("Please input task");
    } else {
      createTask();
    }
  }
});

function createTask() {
  //CREATE TASK(li)
  const task = document.createElement("li");

  const taskText = document.createElement("p");
  taskText.innerHTML = `${inputTask.value}`;

  task.appendChild(taskText);
  //MAKING CONTAINER FOR BUTTONS
  const iconContainer = document.createElement("div");
  iconContainer.classList.add("check-delete-container");

  //MAKING COMPLETED BUTTON AND ADDING CHECK ICON
  const completedButton = document.createElement("button");
  completedButton.classList.add("check");
  completedButton.innerHTML = `<i class="fas fa-check"></i>`;

  completedButton.addEventListener("click", () => completed(taskText));
  //MAKING DELETE BUTTON AND ADDING TRASH ICON
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete");
  deleteButton.innerHTML = `<i class="fas fa-trash-alt"></i>`;

  deleteButton.addEventListener("click", () => deleted(task));
  //ADDING BUTTONS TO CONTAINER
  iconContainer.appendChild(completedButton);
  iconContainer.appendChild(deleteButton);

  //ADDING CONTAINER TO TASK(li)
  task.appendChild(iconContainer);
  saveToStorage(inputTask.value);
  addTask(task);
}

// ADDING TASK
function addTask(task) {
  if (taskList.children.length >= 8) {
    //ADDING TASK TO UL
    taskList.style.overflowY = "scroll";
    taskList.appendChild(task);
    inputTask.value = "";
  } else {
    taskList.appendChild(task);
    inputTask.value = "";
  }
}

// COMPLETED FUNCTION
function completed(taskText) {
  taskText.classList.contains("completed")
    ? taskText.classList.remove("completed")
    : taskText.classList.add("completed");
}
//DELETED FUNCTION
function deleted(task) {
  removeTaskFromStorage(task);
  setTimeout(() => {
    taskList.removeChild(task);
  }, 500);
  task.classList.add("deleted");
  if (taskList.children.length < 8) {
    taskList.style.overflowY = "hidden";
  }
}

//STORAGE

function saveToStorage(task) {
  //CHECKING IF WE HAVE SOMETHING IN STORAGE, IF WE DONT WE PUSH

  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//GET ALL TASKS FROM STORAGE
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach((storageTask) => {
    const task = document.createElement("li");

    const taskText = document.createElement("p");
    taskText.innerHTML = storageTask;

    task.appendChild(taskText);
    //MAKING CONTAINER FOR BUTTONS
    const iconContainer = document.createElement("div");
    iconContainer.classList.add("check-delete-container");

    //MAKING COMPLETED BUTTON AND ADDING CHECK ICON
    const completedButton = document.createElement("button");
    completedButton.classList.add("check");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;

    completedButton.addEventListener("click", () => completed(taskText));
    //MAKING DELETE BUTTON AND ADDING TRASH ICON
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete");
    deleteButton.innerHTML = `<i class="fas fa-trash-alt"></i>`;

    deleteButton.addEventListener("click", () => deleted(task));
    //ADDING BUTTONS TO CONTAINER
    iconContainer.appendChild(completedButton);
    iconContainer.appendChild(deleteButton);

    //ADDING CONTAINER TO TASK(li)
    task.appendChild(iconContainer);
    addTask(task);
  });
}

//REMOVE TASK FROM STORAGE ON CLICK
function removeTaskFromStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  const taskText = task.children[0].innerText;
  console.log(taskText);
  tasks.splice(tasks.indexOf(taskText), 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
