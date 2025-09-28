import React from 'react';
import { Brain } from 'lucide-react';

const Header = () => (
  <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-4 sm:mb-6">
    <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
      <div className="flex items-center space-x-3">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-2 sm:p-3 rounded-lg shadow-md">
          <Brain size={24} className="sm:w-8 sm:h-8" />
        </div>
        <div>
          <h1 className="text-xl sm:text-3xl font-bold text-gray-800">Cortex Pay Engine</h1>
          <p className="text-sm sm:text-base text-gray-600">Ecossistema de Agentes Inteligentes</p>
        </div>
      </div>
      <div className="flex-1"></div>
      <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <span>Sistema Ativo</span>
      </div>
    </div>
  </div>
);

export default Header;