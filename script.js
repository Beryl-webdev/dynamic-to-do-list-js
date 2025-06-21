document.addEventListener('DOMContentLoaded', function () {
  // Select DOM elements
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Initialize tasks array
  let tasks = [];

  // Load tasks from Local Storage
  function loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      tasks = JSON.parse(storedTasks);
      tasks.forEach(task => {
        createTaskElement(task);
      });
    }
  }

  // Save tasks to Local Storage
  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Create a task element and append it to the list
  function createTaskElement(taskText) {
    const li = document.createElement('li');
    li.textContent = taskText;

    // ✅ Add a class to the list item using classList.add
    li.classList.add('task-item');

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'remove-btn';

    // Remove the task from DOM and Local Storage
    removeBtn.addEventListener('click', function () {
      taskList.removeChild(li);
      tasks = tasks.filter(task => task !== taskText);
      saveTasks();
    });

    li.appendChild(removeBtn);
    taskList.appendChild(li);
  }

  // Add task to list and Local Storage
  function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') {
      alert('Please enter a task.');
      return;
    }

    createTaskElement(taskText);
    tasks.push(taskText);
    saveTasks();
    taskInput.value = '';
  }

  // Event listeners
  addButton.addEventListener('click', addTask);

  taskInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      addTask();
    }
  });

  // Load tasks on page load
  loadTasks();
});
