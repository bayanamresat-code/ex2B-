function TaskItem({ task, onToggleTask, onDeleteTask }) {
  return (
    <article className="task-row">
      <div>
        <strong>{task.title}</strong>
        <div>{task.description}</div>
        <small>Status: {task.status}</small>
      </div>
      <div>
        <button type="button" onClick={() => onToggleTask(task.id)}>Toggle</button>
        <button type="button" onClick={() => onDeleteTask(task.id)}>Delete</button>
      </div>
    </article>
  );
}

export default TaskItem;
