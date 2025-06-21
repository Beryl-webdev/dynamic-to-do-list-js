// Ensure the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', function () {
  // Select DOM elements
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Function to add a new task
  function addTask() {
    const taskText = taskInput.value.trim(); // Get the input value and trim whitespace

    // Alert user if the task field is empty
    if (taskText === "") {
      alert("Please enter a task.");
      return;
    }

    // Create list item and set its text
    const li = document.createElement('li');
    li.textContent = taskText;

    // Create remove button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = "Remove";
    removeBtn.className = "remove-btn";

    // Add event to remove the task on button click
    removeBtn.onclick = function () {
      taskList.removeChild(li);
    };

    // Append button to list item, then list item to the list
    li.appendChild(removeBtn);
    taskList.appendChild(li);

    // Clear input field
    taskInput.value = "";
  }

  // Event listener for Add button
  addButton.addEventListener('click', addTask);

  // Event listener for Enter key
  taskInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      addTask();
    }
  });

  // Optional: Automatically add a task on load (can be removed)
  // addTask();
});
