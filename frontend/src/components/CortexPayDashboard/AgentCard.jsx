import React from 'react';

const AgentCard = ({ agent, isActive }) => {
    const Icon = agent.icon;
    return (
      <div className={`p-4 rounded-lg transition-all duration-300 transform ${isActive ? `${agent.color} text-white shadow-xl scale-105` : 'bg-white border-2 border-gray-200 shadow-sm'}`}>
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${isActive ? 'bg-white/20' : `${agent.color} text-white`}`}>
            <Icon size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm">{agent.name}</h3>
            <p className={`text-xs ${isActive ? 'text-gray-100' : 'text-gray-600'} truncate`}>{agent.role}</p>
          </div>
          {isActive && <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>}
        </div>
        <p className={`text-xs mt-2 ${isActive ? 'text-gray-100' : 'text-gray-500'}`}>{agent.description}</p>
      </div>
    );
};

export default AgentCard;