/*
Authors: [Write your names here]
Date: 2026-07-02
Description: Client-side task management logic with immediate updates using fetch.
Imported resources: fetch API
*/

const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');
const logoutButton = document.getElementById('logoutButton');

async function loadTasks() {
  const response = await fetch('/api/tasks');
  if (!response.ok) {
    window.location.href = '/';
    return;
  }

  const tasks = await response.json();
  taskList.innerHTML = '';

  tasks.forEach((task) => {
    const item = document.createElement('li');
    item.className = `task-item ${task.status === 'done' ? 'done' : ''}`;
    item.innerHTML = `
      <div>
        <strong>${task.title}</strong>
        <div>${task.description || ''}</div>
        <small>Status: ${task.status}</small>
      </div>
      <div class="task-actions">
        <button type="button" data-action="toggle" data-id="${task.id}">Toggle</button>
        <button type="button" data-action="delete" data-id="${task.id}">Delete</button>
      </div>
    `;
    taskList.appendChild(item);
  });
}

taskForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(taskForm);
  const payload = Object.fromEntries(formData.entries());

  await fetch('/api/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  taskForm.reset();
  loadTasks();
});

taskList.addEventListener('click', async (event) => {
  const button = event.target.closest('button');
  if (!button) {
    return;
  }

  const taskId = button.dataset.id;
  const action = button.dataset.action;

  if (action === 'toggle') {
    await fetch(`/api/tasks/${taskId}`, { method: 'PUT' });
  }

  if (action === 'delete') {
    await fetch(`/api/tasks/${taskId}`, { method: 'DELETE' });
  }

  loadTasks();
});

logoutButton.addEventListener('click', async () => {
  await fetch('/api/logout', { method: 'POST' });
  window.location.href = '/';
});

loadTasks();
