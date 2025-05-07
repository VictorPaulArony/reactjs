// import React from 'react';

// component to load and reload the sreen 
import { RefreshCw } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <RefreshCw className="h-8 w-8 text-primary animate-spin" />
        </div>
        <h1 className="text-xl font-semibold text-gray-900">Loading SUI-KSH DEX</h1>
        <p className="text-sm text-gray-500">Please wait while we set things up...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;