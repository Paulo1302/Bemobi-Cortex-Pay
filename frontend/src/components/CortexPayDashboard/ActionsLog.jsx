import React, { useEffect, useRef } from 'react';
import { Target } from 'lucide-react';

const LogDetails = ({ details }) => {
    if (typeof details !== 'object' || details === null) {
        return <p>{String(details)}</p>;
    }
    return (
        <div className="space-y-2 mt-2 text-sm">
            {Object.entries(details).map(([key, value]) => (
                <div key={key} className="flex flex-col sm:flex-row">
                    <span className="font-semibold capitalize w-32 flex-shrink-0">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                    <span className="break-all text-gray-700">{Array.isArray(value) ? value.join(', ') : String(value)}</span>
                </div>
            ))}
        </div>
    );
};

const ActionsLog = ({ actions, agents }) => {
    const logContainerRef = useRef(null);

    useEffect(() => {
        if (logContainerRef.current) {
            logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
        }
    }, [actions]);

    return (
        <div ref={logContainerRef} className="bg-gray-50 rounded-lg p-3 max-h-96 overflow-y-auto">
          {actions.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <Target className="mx-auto mb-3 text-gray-300" size={32} />
              <p className="text-sm">Nenhuma ação executada ainda</p>
              <p className="text-xs text-gray-400">Clique num botão acima para começar</p>
            </div>
          ) : (
            <div className="space-y-4">
              {actions.map((action, index) => (
                <div key={index} className="bg-white p-4 rounded-lg border-l-4 border-blue-400 shadow-sm transition-opacity duration-500 opacity-100">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2.5 h-2.5 rounded-full ${agents[action.agent]?.color}`}></div>
                      <span className="font-semibold text-blue-600 text-base">{agents[action.agent]?.name || 'Sistema'}</span>
                    </div>
                    <span className="text-gray-500 text-sm mt-1 sm:mt-0">{new Date(action.timestamp).toLocaleTimeString()}</span>
                  </div>
                  <p className="text-gray-800 text-base mb-3">{action.action}</p>
                  {action.details && <div className="text-sm text-gray-600 bg-gray-100 p-3 rounded"><LogDetails details={action.details} /></div>}
                </div>
              ))}
            </div>
          )}
        </div>
    );
};

export default ActionsLog;
