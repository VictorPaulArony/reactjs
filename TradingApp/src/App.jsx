import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import './App.css'
import Navbar from './component/Navbar';



function App() {
  const widgetContainerRef = useRef(null);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const widgetRef = useRef(null);
  const scriptRef = useRef(null);

  // Only run on client side
  useEffect(() => {
    setMounted(true);
  }, []);

  // Function to create the widget with the current theme
  const createWidget = async () => {
    try {
      // Clean up any existing widget
      if (widgetRef.current && widgetContainerRef.current) {
        widgetContainerRef.current.innerHTML = "";
        widgetRef.current = null;
      }

      // Determine the theme to use
      const currentTheme = theme === "dark" ? "dark" : "light";

      // Load TradingView script dynamically
      if (!window.TradingView) {
        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/tv.js";
        script.async = true;

        // Wait for the script to load
        await new Promise((resolve) => {
          script.onload = () => resolve();
          document.body.appendChild(script);
        });
      }

      // Create the widget with the current theme
      if (window.TradingView && widgetContainerRef.current) {
        widgetRef.current = new window.TradingView.widget({
          container_id: widgetContainerRef.current.id,
          width: "100%",
          height: 500,
          symbol: "NASDAQ:AAPL", // Default symbol
          interval: "D",
          timezone: "Etc/UTC",
          theme: theme === "dark" ? "dark" : "light",
          style: "1",
          locale: "en",
          toolbar_bg: theme === "dark" ? "dark" : "light",
          enable_publishing: false,
          allow_symbol_change: true,
          hide_side_toolbar: false,
        });
      }
    } catch (error) {
      console.error("Error creating TradingView widget:", error);
    }
  };

  // Create or recreate the widget when the theme changes
  useEffect(() => {
    if (mounted) {
      createWidget();
    }

    // Cleanup on unmount
    return () => {
      if (widgetContainerRef.current) {
        widgetContainerRef.current.innerHTML = "";
      }
    };
  }, [mounted, theme]);

  // Show a placeholder while loading
  if (!mounted) {
    return (
      <div className="w-full h-[500px] bg-muted/20 flex items-center justify-center">
        <p className="text-muted-foreground">Loading chart...</p>
      </div>
    );
  }

  return(
    <div>
      < Navbar />
      <div id="tradingview-widget" ref={widgetContainerRef} className="w-full h-[500px]"></div>
    </div>
  ) 
  
}

export default App


