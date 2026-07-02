import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTask, deleteTask, getTasks, toggleTask } from '../api/taskApi';
import { logoutUser } from '../api/authApi';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { useAuth } from '../context/AuthContext';

function TasksPage() {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();
  const [tasks, setTasks] = useState([]);

  async function loadTasks() {
    const data = await getTasks();
    setTasks(data);
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function handleAddTask(taskData) {
    await createTask(taskData);
    loadTasks();
  }

  async function handleToggleTask(id) {
    await toggleTask(id);
    loadTasks();
  }

  async function handleDeleteTask(id) {
    await deleteTask(id);
    loadTasks();
  }

  async function handleLogout() {
    await logoutUser();
    setIsAuthenticated(false);
    navigate('/');
  }

  return (
    <main className="page-shell">
      <section className="panel">
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
          <h1>My Tasks</h1>
          <button type="button" onClick={handleLogout}>Logout</button>
        </div>
        <TaskForm onAddTask={handleAddTask} />
        <TaskList tasks={tasks} onToggleTask={handleToggleTask} onDeleteTask={handleDeleteTask} />
      </section>
    </main>
  );
}

export default TasksPage;
