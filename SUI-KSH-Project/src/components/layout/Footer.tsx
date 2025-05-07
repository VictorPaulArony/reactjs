import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-4 px-6">
      <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
        <div className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} SUI-KSH DEX. All rights reserved.
        </div>
        <div className="flex space-x-4 text-sm">
          <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">Terms</a>
          <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">Privacy</a>
          <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">Support</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;