import React from 'react';
import { useTheme } from '../context/ThemeContext';

function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className={`navbar ${theme}`}>
      <label className="toggle-container">
        <span className="toggle-label">{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
        <input
          type="checkbox"
          checked={theme === 'dark'}
          onChange={toggleTheme}
          className="toggle-input"
        />
        <span className={`toggle-switch ${theme}`}>
          <span className={`toggle-slider ${theme}`}></span>
        </span>
      </label>
    </nav>
  );
}

export default Navbar;