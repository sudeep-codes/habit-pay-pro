import React, { useState, useEffect } from 'react';
import { getStorage, setStorage, defaultTodos } from '../utils/storage';
import { Trash2 } from 'lucide-react';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    setTodos(getStorage('habitpay_todos', defaultTodos));
  }, []);

  const saveTodos = (updatedTodos) => {
    setTodos(updatedTodos);
    setStorage('habitpay_todos', updatedTodos);
  };

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    const newTaskObj = {
      id: Date.now(),
      text: newTask.trim(),
      completed: false
    };

    saveTodos([...todos, newTaskObj]);
    setNewTask('');
  };

  const toggleTask = (id) => {
    const updated = todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    saveTodos(updated);
  };

  const deleteTask = (id) => {
    const updated = todos.filter(todo => todo.id !== id);
    saveTodos(updated);
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-xl mb-4 border-b border-matrix-dim inline-block uppercase tracking-widest">
        &gt; TODO LIST
      </h2>

      <form onSubmit={addTask} className="mb-4 flex gap-2">
        <input 
          type="text" 
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New system task..."
          className="flex-grow bg-black border border-matrix-dim text-matrix-green p-2 focus:outline-none focus:border-matrix-green transition-colors"
        />
        <button 
          type="submit"
          className="border border-matrix-green text-matrix-green px-4 hover:bg-matrix-green hover:text-black transition-all font-bold"
        >
          ADD
        </button>
      </form>

      <ul className="space-y-2 overflow-y-auto flex-grow pr-2">
        {todos.map(todo => (
          <li 
            key={todo.id} 
            className={`flex justify-between items-center p-2 border border-matrix-dim/50 transition-all ${
              todo.completed ? 'opacity-50 line-through' : 'hover:border-matrix-green'
            }`}
          >
            <div 
              className="flex items-center gap-3 cursor-pointer flex-grow"
              onClick={() => toggleTask(todo.id)}
            >
              <div className="w-4 h-4 border border-matrix-green flex items-center justify-center">
                {todo.completed && <span className="text-xs">✓</span>}
              </div>
              <span className="text-sm">{todo.text}</span>
            </div>
            <button 
              onClick={() => deleteTask(todo.id)}
              className="text-matrix-dim hover:text-red-500 transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </li>
        ))}
        {todos.length === 0 && (
          <li className="text-matrix-dim text-sm italic text-center mt-4">No active tasks detected.</li>
        )}
      </ul>
    </div>
  );
};

export default TodoList;