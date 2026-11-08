// Array that stores all tasks
let tasks = [];

const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const errorMsg = document.getElementById("task-error");
const list = document.getElementById("task-list");
const summary = document.getElementById("task-summary");

// Load saved tasks (if any) when the page opens
function loadTasks() {
  try {
    const saved = localStorage.getItem("tasks");
    tasks = saved ? JSON.parse(saved) : [];
  } catch (e) {
    tasks = [];
  }
}

function saveTasks() {
  try {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  } catch (e) {}
}

// Add a task
function addTask(text) {
  tasks.push({ id: Date.now(), text: text, done: false });
  saveTasks();
  renderTasks();
}

// Mark a task as completed / not completed
function toggleTask(id) {
  tasks = tasks.map(function (task) {
    return task.id === id ? { ...task, done: !task.done } : task;
  });
  saveTasks();
  renderTasks();
}

// Delete a task
function deleteTask(id) {
  tasks = tasks.filter(function (task) {
    return task.id !== id;
  });
  saveTasks();
  renderTasks();
}

// Rebuild the list on the page (DOM manipulation)
function renderTasks() {
  list.innerHTML = "";

  tasks.forEach(function (task) {
    const li = document.createElement("li");
    if (task.done) li.classList.add("completed");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.setAttribute("aria-label", "Mark task as completed");
    checkbox.addEventListener("change", function () {
      toggleTask(task.id);
    });

    const span = document.createElement("span");
    span.textContent = task.text;

    const delBtn = document.createElement("button");
    delBtn.type = "button";
    delBtn.textContent = "Delete";
    delBtn.className = "delete-btn";
    delBtn.addEventListener("click", function () {
      deleteTask(task.id);
    });

    li.append(checkbox, span, delBtn);
    list.appendChild(li);
  });

  const completed = tasks.filter(function (t) { return t.done; }).length;
  summary.textContent = tasks.length === 0
    ? "No tasks yet. Add one above."
    : completed + " of " + tasks.length + " tasks completed";
}

// Handle form submit (event handling + validation)
form.addEventListener("submit", function (event) {
  event.preventDefault();
  const text = input.value.trim();

  if (text === "") {
    errorMsg.textContent = "Please enter a task.";
    return;
  }

  errorMsg.textContent = "";
  addTask(text);
  input.value = "";
  input.focus();
});

loadTasks();
renderTasks();