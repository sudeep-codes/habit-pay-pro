import React, { useState, useEffect } from 'react';
import { getStorage, setStorage, defaultExpenses } from '../utils/storage';

const ExpenseManager = () => {
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [note, setNote] = useState('');

  const categories = ['Food', 'Transport', 'Shopping', 'Bills', 'Other'];

  useEffect(() => {
    setExpenses(getStorage('habitpay_expenses', defaultExpenses));
  }, []);

  const handlePayAndLog = (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount)) return;

    const newExpense = {
      id: Date.now(),
      amount: parseFloat(amount),
      category,
      note,
      date: new Date().toISOString()
    };

    const updatedExpenses = [newExpense, ...expenses];
    setExpenses(updatedExpenses);
    setStorage('habitpay_expenses', updatedExpenses);

    // Reset form
    setAmount('');
    setNote('');

    // The Magic Redirect: Opens GPay web interface in a new tab
    window.open("https://pay.google.com", "_blank");
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-xl mb-4 border-b border-matrix-dim inline-block uppercase tracking-widest">
        &gt; EXPENSE TRACKER
      </h2>

      <form onSubmit={handlePayAndLog} className="mb-6 space-y-3">
        <div className="flex gap-2">
          <div className="relative w-1/3">
            <span className="absolute left-2 top-2 text-matrix-dim">₹</span>
            <input 
              type="number" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full bg-black border border-matrix-dim text-matrix-green p-2 pl-6 focus:outline-none focus:border-matrix-green transition-colors"
              required
            />
          </div>
          <select 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-2/3 bg-black border border-matrix-dim text-matrix-green p-2 focus:outline-none focus:border-matrix-green"
          >
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
        
        <input 
          type="text" 
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Enter note (e.g., Snacks)"
          className="w-full bg-black border border-matrix-dim text-matrix-green p-2 focus:outline-none focus:border-matrix-green"
        />

        <button 
          type="submit"
          className="w-full bg-matrix-dim/20 border border-matrix-green text-matrix-green p-2 hover:bg-matrix-green hover:text-black transition-all font-bold tracking-wider uppercase mt-2"
        >
          PAY & LOG
        </button>
      </form>

      <div className="flex-grow overflow-y-auto pr-2">
        <h3 className="text-sm text-matrix-dim mb-2 uppercase">Recent Transactions</h3>
        <ul className="space-y-2 text-sm">
          {expenses.slice(0, 5).map(exp => (
            <li key={exp.id} className="flex justify-between items-center border-b border-matrix-dim/30 pb-1">
              <div>
                <span className="font-bold text-matrix-green">₹{exp.amount}</span>
                <span className="text-matrix-dim ml-2">[{exp.category}]</span>
                <p className="text-xs text-matrix-green/70 truncate w-40">{exp.note}</p>
              </div>
              <span className="text-xs text-matrix-dim text-right">
                {new Date(exp.date).toLocaleDateString()}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExpenseManager;