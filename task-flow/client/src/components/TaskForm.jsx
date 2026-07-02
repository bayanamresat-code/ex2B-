import { useState } from 'react';

function TaskForm({ onAddTask }) {
  const [formData, setFormData] = useState({ title: '', description: '' });

  async function handleSubmit(event) {
    event.preventDefault();
    await onAddTask(formData);
    setFormData({ title: '', description: '' });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task title"
        value={formData.title}
        onChange={(event) => setFormData({ ...formData, title: event.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Task description"
        value={formData.description}
        onChange={(event) => setFormData({ ...formData, description: event.target.value })}
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
