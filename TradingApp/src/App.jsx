import React, { useEffect, useRef, useState } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import './App.css';
import Navbar from './component/Navbar';

// Main app content that uses the theme
const AppContent = () => {
  const widgetContainerRef = useRef(null);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const widgetRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const createWidget = async () => {
    try {
      if (widgetRef.current && widgetContainerRef.current) {
        widgetContainerRef.current.innerHTML = "";
        widgetRef.current = null;
      }

      if (!window.TradingView) {
        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/tv.js";
        script.async = true;
        
        await new Promise((resolve) => {
          script.onload = () => resolve();
          document.body.appendChild(script);
        });
      }

      if (window.TradingView && widgetContainerRef.current) {
        widgetRef.current = new window.TradingView.widget({
          container_id: widgetContainerRef.current.id,
          width: "100%",
          height: 500,
          symbol: "NASDAQ:AAPL",
          interval: "D",
          timezone: "Etc/UTC",
          theme: theme,
          style: "1",
          locale: "en",
          toolbar_bg: theme === 'dark' ? '#1e222d' : '#f1f3f6',
          enable_publishing: false,
          allow_symbol_change: true,
          hide_side_toolbar: false,
        });
      }
    } catch (error) {
      console.error("Error creating TradingView widget:", error);
    }
  };

  useEffect(() => {
    if (mounted) {
      createWidget();
    }
    
    return () => {
      if (widgetContainerRef.current) {
        widgetContainerRef.current.innerHTML = "";
      }
    };
  }, [mounted, theme]);

  if (!mounted) {
    return (
      <div className="loading-placeholder">
        <p>Loading chart...</p>
      </div>
    );
  }

  return (
    <div className={theme}>
      <Navbar />
      <div id="tradingview-widget" ref={widgetContainerRef}></div>
    </div>
  );
};

// Main App component that provides the theme context
const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;