export const getStorage = (key, initialValue) => {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  } catch (error) {
    console.error("Storage read error:", error);
    return initialValue;
  }
};

export const setStorage = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Storage write error:", error);
  }
};

// Seeded Default States
export const defaultTodos = [
  { id: 1, text: "Solve 2 LeetCode problems", completed: false }
];

export const defaultExpenses = [
  { id: 1, amount: 150, category: "Food", note: "Snacks", date: new Date().toISOString() }
];

export const defaultHabits = [
  { id: 1, name: "DSA Practice", days: [false, false, false, false, false, false, false] }
];