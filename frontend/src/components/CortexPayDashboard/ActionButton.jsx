import React from 'react';

const ActionButton = ({ onClick, disabled, agentKey, agents, children }) => {
    const agent = agents[agentKey];
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`w-full flex flex-col items-center justify-center p-4 rounded-lg text-white transition-all transform hover:scale-105 shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 ${agent.color.replace('bg-', 'from-')}-500 ${agent.color.replace('bg-', 'to-')}-600 bg-gradient-to-r hover:shadow-lg`}
        >
            {children}
        </button>
    );
};

export default ActionButton;