import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../api/authApi';
import { useAuth } from '../context/AuthContext';

function LoginPage() {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');

  async function handleLogin(event) {
    event.preventDefault();
    try {
      await loginUser(loginForm);
      setIsAuthenticated(true);
      navigate('/tasks');
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function handleRegister(event) {
    event.preventDefault();
    try {
      const result = await registerUser(registerForm);
      setMessage(result.message);
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <main className="page-shell">
      <section className="panel">
        <h1>Task Flow React</h1>
        <p>Login or register to manage your personal tasks.</p>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={loginForm.username}
            onChange={(event) => setLoginForm({ ...loginForm, username: event.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={loginForm.password}
            onChange={(event) => setLoginForm({ ...loginForm, password: event.target.value })}
            required
          />
          <button type="submit">Login</button>
        </form>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="New username"
            value={registerForm.username}
            onChange={(event) => setRegisterForm({ ...registerForm, username: event.target.value })}
            required
          />
          <input
            type="password"
            placeholder="New password"
            value={registerForm.password}
            onChange={(event) => setRegisterForm({ ...registerForm, password: event.target.value })}
            required
          />
          <button type="submit">Register</button>
        </form>

        <p>{message}</p>
      </section>
    </main>
  );
}

export default LoginPage;
