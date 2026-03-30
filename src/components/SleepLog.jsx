import React, { useState, useEffect } from 'react';
import { getStorage, setStorage } from '../utils/storage';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const SleepLog = () => {
  const [sleepData, setSleepData] = useState([]);
  const [hours, setHours] = useState('');
  const [quality, setQuality] = useState('3');

  useEffect(() => {
    const saved = getStorage('habitpay_sleep', []);
    if (saved.length === 0) {
      // Seed some dummy data for the graph to render initially
      const dummyData = [
        { date: 'Mon', hours: 6.5, quality: 3 },
        { date: 'Tue', hours: 7.2, quality: 4 },
        { date: 'Wed', hours: 5.5, quality: 2 },
        { date: 'Thu', hours: 8.0, quality: 5 },
      ];
      setSleepData(dummyData);
    } else {
      setSleepData(saved);
    }
  }, []);

  const addSleepLog = (e) => {
    e.preventDefault();
    if (!hours || isNaN(hours)) return;

    const newLog = {
      date: new Date().toLocaleDateString('en-US', { weekday: 'short' }),
      hours: parseFloat(hours),
      quality: parseInt(quality)
    };

    // Keep only the last 7 days
    const updated = [...sleepData, newLog].slice(-7);
    setSleepData(updated);
    setStorage('habitpay_sleep', updated);
    
    setHours('');
  };

  const avgSleep = sleepData.length 
    ? (sleepData.reduce((acc, curr) => acc + curr.hours, 0) / sleepData.length).toFixed(1) 
    : 0;

  // Custom Tooltip for the Matrix theme
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black border border-matrix-green p-2 text-xs">
          <p className="text-matrix-green">{`Hours: ${payload[0].value}`}</p>
          <p className="text-matrix-dim">{`Quality: ${payload[0].payload.quality}/5`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-end mb-4 border-b border-matrix-dim pb-1">
        <h2 className="text-xl uppercase tracking-widest">&gt; SLEEP TRACKER</h2>
        <span className="text-xs text-matrix-green animate-pulse">AVG: {avgSleep} HRS</span>
      </div>

      <div className="h-40 w-full mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={sleepData}>
            <XAxis dataKey="date" stroke="#008F11" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#008F11" fontSize={12} domain={[0, 'dataMax + 2']} tickLine={false} axisLine={false} />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#008F11', strokeWidth: 1, strokeDasharray: '3 3' }} />
            <Line 
              type="monotone" 
              dataKey="hours" 
              stroke="#00FF41" 
              strokeWidth={2} 
              dot={{ fill: '#000000', stroke: '#00FF41', strokeWidth: 2, r: 4 }} 
              activeDot={{ r: 6, fill: '#00FF41' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <form onSubmit={addSleepLog} className="flex gap-2 mt-auto">
        <input 
          type="number" 
          step="0.1"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          placeholder="Hours (e.g. 7.5)"
          className="w-1/2 bg-black border border-matrix-dim text-matrix-green p-2 text-sm focus:outline-none focus:border-matrix-green"
          required
        />
        <select 
          value={quality}
          onChange={(e) => setQuality(e.target.value)}
          className="w-1/4 bg-black border border-matrix-dim text-matrix-green p-2 text-sm focus:outline-none focus:border-matrix-green"
        >
          <option value="1">1 - Poor</option>
          <option value="2">2 - Fair</option>
          <option value="3">3 - Good</option>
          <option value="4">4 - Great</option>
          <option value="5">5 - Excellent</option>
        </select>
        <button type="submit" className="w-1/4 border border-matrix-green text-matrix-green p-2 text-sm hover:bg-matrix-green hover:text-black transition-colors font-bold">
          LOG
        </button>
      </form>
    </div>
  );
};

export default SleepLog;