import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [task, setTask] = useState('');
  const [filter, setFilter] = useState('all');
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.trim()) return;
    setTodos([...todos, { text: task, completed: false }]);
    setTask('');
  };

  const toggleComplete = (clickedTodo) => {
    const updatedTodos = todos.map(todo =>
      todo === clickedTodo ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const deleteTodo = (clickedTodo) => {
    const updatedTodos = todos.filter(todo => todo !== clickedTodo);
    setTodos(updatedTodos);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);


  return (
    <div className="App">
      <h1>📝 React To-Do App</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a task"
        />
        <button type="submit">Add</button>
      </form>

      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('active')}>Active</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
      </div>

      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo.text} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span
              onClick={() => toggleComplete(todo)}
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                cursor: 'pointer',
                flex: 1
              }}
            >
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo)} style={{ marginLeft: '1rem', background: 'red', color: 'white', border: 'none', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;