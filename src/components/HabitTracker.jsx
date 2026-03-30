import React, { useState, useEffect } from 'react';
import { getStorage, setStorage } from '../utils/storage';
import { Plus, Trash2 } from 'lucide-react';

const HabitTracker = () => {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState('');
  
  // Generate 30 days based on the PDF format
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const dayLabels = ['Sa', 'Su', 'M', 'T', 'W', 'Th', 'F', 'Sa', 'Su', 'M', 'T', 'W', 'Th', 'F', 'Sa', 'Su', 'M', 'T', 'W', 'Th', 'F', 'Sa', 'Su', 'M', 'T', 'W', 'Th', 'F', 'Sa', 'Su'];

  useEffect(() => {
    const saved = getStorage('habitpay_habits', []);
    if (saved.length === 0) {
      // Default placeholder based on the 30-day layout
      setHabits([{ id: 1, name: "DSA Practice", checks: Array(30).fill(false) }]);
    } else {
      setHabits(saved);
    }
  }, []);

  const saveHabits = (updatedHabits) => {
    setHabits(updatedHabits);
    setStorage('habitpay_habits', updatedHabits);
  };

  const addHabit = (e) => {
    e.preventDefault();
    if (!newHabit.trim()) return;
    
    const habit = {
      id: Date.now(),
      name: newHabit.trim(),
      checks: Array(30).fill(false)
    };
    saveHabits([...habits, habit]);
    setNewHabit('');
  };

  const toggleCheck = (habitId, dayIndex) => {
    const updated = habits.map(habit => {
      if (habit.id === habitId) {
        const newChecks = [...habit.checks];
        newChecks[dayIndex] = !newChecks[dayIndex];
        return { ...habit, checks: newChecks };
      }
      return habit;
    });
    saveHabits(updated);
  };

  const deleteHabit = (id) => {
    saveHabits(habits.filter(h => h.id !== id));
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex justify-between items-end mb-4 border-b border-matrix-dim pb-1">
        <h2 className="text-xl uppercase tracking-widest">&gt; 30 DAYS HABIT TRACKER</h2>
        <span className="text-xs text-matrix-dim">GETTING 1% BETTER EACH DAY</span>
      </div>

      <form onSubmit={addHabit} className="mb-4 flex gap-2">
        <input 
          type="text" 
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
          placeholder="New protocol..."
          className="flex-grow bg-black border border-matrix-dim text-matrix-green p-2 text-sm focus:outline-none focus:border-matrix-green"
        />
        <button type="submit" className="border border-matrix-green p-2 hover:bg-matrix-green hover:text-black transition-colors">
          <Plus size={20} />
        </button>
      </form>

      <div className="overflow-x-auto overflow-y-auto custom-scrollbar flex-grow pr-2">
        <div className="min-w-[600px]">
          {/* Header Row */}
          <div className="flex mb-1 sticky top-0 bg-black z-10">
            <div className="w-32 flex-shrink-0 font-bold border-r border-matrix-dim/50 p-1 text-sm">HABIT</div>
            <div className="flex flex-grow">
              {days.map((day, i) => (
                <div key={i} className="flex-1 min-w-[24px] text-center flex flex-col items-center justify-end border-r border-matrix-dim/20 pb-1">
                  <span className="text-[10px] text-matrix-dim">{day}</span>
                  <span className="text-xs font-bold">{dayLabels[i]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Habit Rows */}
          {habits.map(habit => (
            <div key={habit.id} className="flex border-b border-matrix-dim/30 hover:bg-matrix-dim/10 transition-colors group">
              <div className="w-32 flex-shrink-0 border-r border-matrix-dim/50 p-1 flex justify-between items-center">
                <span className="text-xs truncate" title={habit.name}>{habit.name}</span>
                <button onClick={() => deleteHabit(habit.id)} className="opacity-0 group-hover:opacity-100 text-matrix-dim hover:text-red-500 transition-opacity">
                  <Trash2 size={12} />
                </button>
              </div>
              <div className="flex flex-grow py-1">
                {habit.checks.map((isChecked, i) => (
                  <div 
                    key={i} 
                    onClick={() => toggleCheck(habit.id, i)}
                    className="flex-1 min-w-[24px] flex justify-center items-center cursor-pointer border-r border-matrix-dim/10 hover:bg-matrix-dim/30"
                  >
                    {isChecked ? <div className="w-3 h-3 bg-matrix-green shadow-[0_0_5px_#00FF41]"></div> : <div className="w-1 h-1 bg-matrix-dim/30"></div>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HabitTracker;