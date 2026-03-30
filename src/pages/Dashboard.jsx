import React, { useState, useEffect } from 'react';
import SleepLog from '../components/SleepLog';
import HabitTracker from '../components/HabitTracker';
import TodoList from '../components/TodoList';
import ExpenseManager from '../components/ExpenseManager';
import { Sun, Moon } from 'lucide-react';

const Dashboard = () => {
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    if (isLightMode) {
      document.body.classList.add('theme-light');
    } else {
      document.body.classList.remove('theme-light');
    }
  }, [isLightMode]);

  return (
    <div className="container mx-auto p-4 max-w-7xl relative z-10 transition-colors duration-300">
      
      <header className="mb-8 border-b border-matrix-dim pb-4 flex justify-between items-center">
        <div className="w-10"></div> 
        
        <h1 className="text-4xl font-bold tracking-widest text-center animate-pulse text-matrix-green shadow-matrix-green drop-shadow-[0_0_10px_rgba(0,255,65,0.5)]">
          {isLightMode ? 'HabitP@y' : 'HabitP@y'}
        </h1>
        
        <button 
          onClick={() => setIsLightMode(!isLightMode)}
          className="p-2 border border-matrix-green text-matrix-green hover:bg-matrix-green hover:text-black transition-all flex items-center gap-2"
          title="Toggle Day/Night Protocol"
        >
          {isLightMode ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="border border-matrix-green bg-black/80 p-4 backdrop-blur-sm shadow-[0_0_15px_rgba(0,255,65,0.1)] h-[400px] flex flex-col transition-all duration-300">
           <SleepLog />
        </div>

        <div className="border border-matrix-green bg-black/80 p-4 backdrop-blur-sm shadow-[0_0_15px_rgba(0,255,65,0.1)] h-[400px] flex flex-col transition-all duration-300">
           <HabitTracker />
        </div>

        <div className="border border-matrix-green bg-black/80 p-4 backdrop-blur-sm shadow-[0_0_15px_rgba(0,255,65,0.1)] h-[400px] flex flex-col transition-all duration-300">
           <TodoList />
        </div>

        <div className="border border-matrix-green bg-black/80 p-4 backdrop-blur-sm shadow-[0_0_15px_rgba(0,255,65,0.1)] h-[400px] flex flex-col transition-all duration-300">
           <ExpenseManager />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;