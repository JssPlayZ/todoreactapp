import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [task, setTask] = useState('');
  const [filter, setFilter] = useState('all');
  const [editTodo, setEditTodo] = useState(null);
  const [editText, setEditText] = useState('');
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = task.trim();
    if (!trimmed) return;

    const isDuplicate = todos.some(todo => todo.text.toLowerCase() === trimmed.toLowerCase());
    if (isDuplicate) {
      alert("This task already exists!");
      return;
    }

    setTodos([...todos, { text: trimmed, completed: false }]);
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

  const startEdit = (todo) => {
    setEditTodo(todo);
    setEditText(todo.text);
  };

  const saveEdit = (todo) => {
    const trimmed = editText.trim();
    if (!trimmed) return;

    const isDuplicate = todos.some(t =>
      t.text.toLowerCase() === trimmed.toLowerCase() && t !== todo
    );

    if (isDuplicate) {
      alert("A task with this name already exists!");
      return;
    }

    const updatedTodos = todos.map(t =>
      t === todo ? { ...t, text: trimmed } : t
    );
    setTodos(updatedTodos);
    setEditTodo(null);
    setEditText('');
  };


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
          <li key={todo.text} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {editTodo === todo ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  style={{ flex: 1 }}
                />
                <button onClick={() => saveEdit(todo)}>Save</button>
                <button onClick={() => setEditTodo(null)}>Cancel</button>
              </>
            ) : (
              <>
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
                <button onClick={() => startEdit(todo)}>Edit</button>
                <button onClick={() => deleteTodo(todo)} style={{ background: 'red', color: 'white' }}>
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;