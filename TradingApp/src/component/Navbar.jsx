import React from 'react';
import { useTheme } from 'next-themes';
import '../App.css';

function Navbar() {
  const { theme, setTheme } = useTheme();

  const handleToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <nav className={`navbar ${theme}`}>
      <label className="toggle-container">
        <span className="toggle-label">{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
        <input
          type="checkbox"
          checked={theme === 'dark'}
          onChange={handleToggle}
          className="toggle-input"
        />
        <div className={`toggle-track ${theme}`}>
          <div className={`toggle-thumb ${theme}`}></div>
        </div>
      </label>
    </nav>
  );
}

export default Navbar;
