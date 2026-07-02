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

export function registerUser(payload) {
  return request('/api/register', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}

export function loginUser(payload) {
  return request('/api/login', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}

export function logoutUser() {
  return request('/api/logout', {
    method: 'POST'
  });
}

export function getCurrentUser() {
  return request('/api/me');
}
