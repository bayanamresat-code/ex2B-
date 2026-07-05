/*
Authors: [Write your names here]
Date: 2026-07-02
Description: Client-side authentication logic for login and registration.
Imported resources: fetch API
*/

const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const messageBox = document.getElementById('messageBox');

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(loginForm);
  const payload = Object.fromEntries(formData.entries());

  const response = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  const result = await response.json();
  if (response.ok) {
    window.location.href = '/tasks';
    return;
  }

  messageBox.textContent = result.message;
});

registerForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(registerForm);
  const payload = Object.fromEntries(formData.entries());

  const response = await fetch('/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  const result = await response.json();
  messageBox.textContent = result.message;
});
