'use client';
import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved === 'true') {
      setDark(true);
      document.body.style.backgroundColor = '#0a1928';
      document.body.style.color = '#e2e8f0';
    }
  }, []);

  const toggle = () => {
    const newDark = !dark;
    setDark(newDark);
    localStorage.setItem('darkMode', newDark);
    document.body.style.backgroundColor = newDark ? '#0a1928' : '#e6f0f5';
    document.body.style.color = newDark ? '#e2e8f0' : '#1e2a3e';
  };

  return (
    <button onClick={toggle} style={{
      position: 'fixed', top: 20, right: 20,
      background: dark ? '#f1c40f' : '#1e2a3e',
      color: dark ? '#1e2a3e' : 'white',
      border: 'none', borderRadius: 40,
      padding: '8px 16px', cursor: 'pointer',
      zIndex: 1000
    }}>
      {dark ? '☀️' : '🌙'}
    </button>
  );
}