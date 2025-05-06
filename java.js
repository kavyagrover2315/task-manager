let taskData = JSON.parse(localStorage.getItem("taskData")) || [];
let filterType = "all";

const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const pendingList = document.getElementById("pending-list");
const completedList = document.getElementById("completed-list");
const filterButtons = document.querySelectorAll(".filters button");

// Handle form submission (Add task)
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = input.value.trim();
  if (value) {
    taskData.push({
      id: Date.now(), 
      text: value,     
      done: false,     
      time: Date.now(), 
    });
    input.value = "";  
    saveAndShow();  
  }
});

function saveAndShow() {
  localStorage.setItem("taskData", JSON.stringify(taskData));  
  showTasks();  
}

// Display tasks in Pending and Completed columns
function showTasks() {
  
  pendingList.innerHTML = "";
  completedList.innerHTML = "";

  // Filter tasks based on the current filter type
  const filteredTasks = taskData.filter(task => {
    if (filterType === "all") return true;
    return filterType === "completed" ? task.done : !task.done;
  });

  // Render tasks into respective columns (Pending or Completed)
  filteredTasks.forEach(task => {
    const item = document.createElement("li");
    item.className = task.done ? "completed" : ""; 
    item.innerHTML = `
      <span onclick="toggle(${task.id})">${task.text}</span>
      <button onclick="remove(${task.id})">Delete</button>
    `;

    // Append to the correct column
    if (task.done) {
      completedList.appendChild(item);  
    } else {
      pendingList.appendChild(item);  
    }
  });
}

// Toggle task status (Completed or Pending)
function toggle(id) {
  const task = taskData.find(t => t.id === id);
  if (task) {
    task.done = !task.done;  
    saveAndShow();  
  }
}

// Remove a task
function remove(id) {
  taskData = taskData.filter(t => t.id !== id);  
  saveAndShow();  
}

// Filter tasks based on selected filter (All, Pending, Completed)
filterButtons.forEach(btn => {
  btn.onclick = () => {
    document.querySelector(".filters .active")?.classList.remove("active");
    btn.classList.add("active");
    filterType = btn.dataset.filter;
    showTasks();
  };
});


showTasks();
