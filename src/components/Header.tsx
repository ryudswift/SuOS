import React from 'react';
import { Bell, Download } from 'lucide-react';

interface HeaderProps {
  title: string;
  onExportData: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onExportData }) => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={onExportData}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </button>
          
          <div className="relative">
            <button className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Bell className="h-5 w-5 text-gray-500" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
          
          <div className="relative">
            <button className="flex items-center space-x-2">
              <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                <span className="text-sm font-medium text-blue-700">SD</span>
              </span>
              <span className="hidden md:inline-block text-sm font-medium">SudoDev Admin</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;