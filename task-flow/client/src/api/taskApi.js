async function request(url, options = {}) {
  const response = await fetch(url, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    ...options
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Request failed.');
  }

  return data;
}

export function getTasks() {
  return request('/api/tasks');
}

export function createTask(payload) {
  return request('/api/tasks', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}

export function toggleTask(id) {
  return request(`/api/tasks/${id}`, {
    method: 'PUT'
  });
}

export function deleteTask(id) {
  return request(`/api/tasks/${id}`, {
    method: 'DELETE'
  });
}
