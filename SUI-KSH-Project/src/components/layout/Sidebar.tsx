// import React from 'react';

// component to display the sidebar of the application
import { Link, useLocation } from 'react-router-dom';
import { Home, RefreshCcw, BarChart3, Clock, Settings } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  
  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Exchange', href: '/exchange', icon: RefreshCcw },
    { name: 'Transactions', href: '/transactions', icon: Clock },
    { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-white border-r border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
            <RefreshCcw className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold">SUI-KSH DEX</span>
        </Link>
      </div>
      
      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              isActive(item.href)
                ? 'bg-primary/10 text-primary'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <item.icon className={`mr-3 h-5 w-5 ${isActive(item.href) ? 'text-primary' : 'text-gray-500'}`} />
            {item.name}
          </Link>
        ))}
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <div className="bg-blue-50 p-3 rounded-md">
          <h3 className="text-sm font-medium text-blue-800 mb-1">Liquidity Pools Status</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">SUI Pool</span>
              <span className="text-xs font-medium text-gray-900">25,000 SUI</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div className="bg-primary h-1.5 rounded-full" style={{ width: '70%' }}></div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">KSH Pool</span>
              <span className="text-xs font-medium text-gray-900">1,500,000 KSH</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div className="bg-secondary h-1.5 rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;