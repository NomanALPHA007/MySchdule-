// script.js
document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.getElementById("task-form");
  const taskList = document.getElementById("task-list");

  taskForm.addEventListener("submit", addTask);

  function addTask(e) {
    e.preventDefault();

    const taskName = document.getElementById("task-name").value;
    const taskDesc = document.getElementById("task-desc").value;
    const taskDate = document.getElementById("task-date").value;
    const taskTime = document.getElementById("task-time").value;

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "add_task.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onload = function () {
      if (this.status === 200) {
        loadTasks();
      }
    };

    xhr.send(
      `name=${taskName}&description=${taskDesc}&date=${taskDate}&time=${taskTime}`
    );
  }

  function loadTasks() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "load_tasks.php", true);
    xhr.onload = function () {
      if (this.status === 200) {
        taskList.innerHTML = this.responseText;
      }
    };
    xhr.send();
  }

  taskList.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete")) {
      const id = e.target.getAttribute("data-id");
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "delete_task.php", true);
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhr.onload = function () {
        if (this.status === 200) {
          loadTasks();
        }
      };
      xhr.send(`id=${id}`);
    }
  });

  loadTasks();
});
// done
