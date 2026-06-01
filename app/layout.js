'use client';
import { useState, useEffect } from 'react';

export const metadata = {
  title: 'Mykonos Promoter',
  description: 'Pianifica la tua vacanza a Mykonos',
};

export default function RootLayout({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  
  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved === 'true') setDarkMode(true);
  }, []);
  
  const toggleDark = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', !darkMode);
  };
  
  return (
    <html lang="it">
      <body style={{
        margin: 0,
        backgroundColor: darkMode ? '#0a1928' : '#e6f0f5',
        fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        transition: 'background 0.3s ease',
        color: darkMode ? '#e2e8f0' : '#1e2a3e'
      }}>
        <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 1000 }}>
          <button onClick={toggleDark} style={{
            background: darkMode ? '#f1c40f' : '#1e2a3e',
            color: darkMode ? '#1e2a3e' : 'white',
            border: 'none',
            borderRadius: 40,
            padding: '8px 16px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}>
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
        {children}
      </body>
    </html>
  );
}
