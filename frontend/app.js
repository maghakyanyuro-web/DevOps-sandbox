import React, { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  
  // Ստանում ենք Backend API-ի հասցեն environment-ից
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetch(`${API_URL}/api/tasks`)
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error("Error fetching tasks:", err));
  }, [API_URL]);

  const addTask = (e) => {
    e.preventDefault();
    if (!input) return;

    fetch(`${API_URL}/api/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: input })
    })
      .then(res => res.json())
      .then(newTask => {
        setTasks([...tasks, newTask]);
        setInput('');
      })
      .catch(err => console.error("Error adding task:", err));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>DevOps Project Task Manager</h1>
      <form onSubmit={addTask}>
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Enter a new task..." 
          style={{ padding: '8px', marginRight: '10px' }}
        />
        <button type="submit" style={{ padding: '8px 15px' }}>Add Task</button>
      </form>
      <ul>
        {tasks.map(task => (
          <li key={task._id} style={{ margin: '5px 0' }}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

