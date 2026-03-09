import { useState, useEffect } from 'react';
import './App.css';

const API = 'http://localhost:5000/api/todos';

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => { fetchTodos(); }, []);

  const fetchTodos = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setTodos(data);
  };

  const addTodo = async () => {
    if (!text.trim()) return;
    await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    setText('');
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await fetch(`${API}/${id}`, { method: 'DELETE' });
    fetchTodos();
  };

  return (
    <div style={{ maxWidth: 500, margin: '50px auto', fontFamily: 'Arial' }}>
      <h1>📝 My Todo App</h1>
      <div style={{ display: 'flex', gap: 10 }}>
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Enter a task..."
          style={{ flex: 1, padding: 10, fontSize: 16 }}
        />
        <button onClick={addTodo} style={{ padding: '10px 20px', fontSize: 16, background: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>
          Add
        </button>
      </div>
      <ul style={{ marginTop: 20, listStyle: 'none', padding: 0 }}>
        {todos.map(todo => (
          <li key={todo._id} style={{ display: 'flex', justifyContent: 'space-between', padding: 10, borderBottom: '1px solid #eee', fontSize: 16 }}>
            {todo.text}
            <button onClick={() => deleteTodo(todo._id)} style={{ background: 'red', color: 'white', border: 'none', cursor: 'pointer', padding: '4px 10px' }}>
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;