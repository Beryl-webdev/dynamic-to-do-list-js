document.addEventListener('DOMContentLoaded', function () {
  // Select DOM elements
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Initialize an array to store tasks
  let tasks = [];

  // Load tasks from Local Storage and display them
  function loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      tasks = JSON.parse(storedTasks); // Convert JSON string to array
      tasks.forEach(task => {
        createTaskElement(task); // Add each task to the DOM
      });
    }
  }

  // Save current tasks array to Local Storage
  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Create and display a task in the list
  function createTaskElement(taskText) {
    const li = document.createElement('li');
    li.textContent = taskText;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'remove-btn';

    // Remove task on button click
    removeBtn.addEventListener('click', function () {
      taskList.removeChild(li); // Remove from DOM
      tasks = tasks.filter(task => task !== taskText); // Remove from array
      saveTasks(); // Update Local Storage
    });

    li.appendChild(removeBtn);
    taskList.appendChild(li);
  }

  // Add new task and update DOM and Local Storage
  function addTask() {
    const taskText = taskInput.value.trim(); // Remove whitespace

    // Validate non-empty input
    if (taskText === '') {
      alert('Please enter a task.');
      return;
    }

    createTaskElement(taskText); // Display task
    tasks.push(taskText);        // Update array
    saveTasks();                 // Save to Local Storage

    taskInput.value = '';        // Clear input field
  }

  // Add task on button click
  addButton.addEventListener('click', addTask);

  // Add task on pressing Enter key
  taskInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      addTask();
    }
  });

  // Load tasks from Local Storage on page load
  loadTasks();
});

