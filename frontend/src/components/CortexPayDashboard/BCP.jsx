import React, { useState, useEffect } from 'react';
import { Brain, Shield, Zap, BarChart3, TrendingUp, CheckCircle, AlertTriangle, MessageSquare, RefreshCw } from 'lucide-react';

import apiService from '../../services/apiService';
import Header from './Header';
import CustomerProfile from './CustomerProfile';
import AgentCard from './AgentCard';
import ActionsLog from './ActionsLog';
import ActionButton from './ActionButton';

const BCP = () => {
  const [customerData, setCustomerData] = useState(null);
  const [agentActions, setAgentActions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeAgent, setActiveAgent] = useState(null);

  const USER_ID = 'joao_silva';

  const agents = {
    insight: { name: 'Agent Insight', role: 'Analista Preditivo', icon: Brain, color: 'bg-blue-500', description: 'Analisa padrões e prediz riscos financeiros' },
    grace: { name: 'Agent Grace Plus', role: 'Conselheiro Empático', icon: MessageSquare, color: 'bg-green-500', description: 'Comunicação personalizada e suporte' },
    guardian: { name: 'Agent Guardian', role: 'Protetor Personalizado', icon: Shield, color: 'bg-red-500', description: 'Segurança adaptativa baseada no perfil' },
    orchestrator: { name: 'Agent Orchestrator', role: 'O Maestro', icon: Zap, color: 'bg-purple-500', description: 'Coordena e decide as melhores ações' },
  };

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [user, log] = await Promise.all([
        apiService.getUser(USER_ID),
        apiService.getEventLog()
      ]);
      setCustomerData(user);
      setAgentActions(log);
    } catch (err) {
      setError('Falha ao carregar dados do servidor. O back-end está a correr?');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAction = async (actionType, apiCall, agentKey) => {
    setIsLoading(true);
    setError(null);
    setActiveAgent(agentKey);
    try {
      await apiCall(USER_ID);
      const updatedLog = await apiService.getEventLog();
      setAgentActions(updatedLog);
    } catch (err) {
      setError(`Falha ao executar a ação: ${actionType}`);
      console.error(err);
    } finally {
      setIsLoading(false);
      setTimeout(() => setActiveAgent(null), 2500);
    }
  };

  const handleAnalyzeRisk = () => handleAction('Analisar Risco', apiService.analyzeRisk, 'insight');
  const handleAnalyzeSecurity = () => handleAction('Analisar Segurança', apiService.analyzeSecurity, 'guardian');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 font-sans">
      <div className="max-w-6xl mx-auto px-4 py-4 sm:py-6">
        <Header />
        
        {error && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded" role="alert"><p className="font-bold">Erro de Comunicação</p><p>{error}</p></div>}

        <div className="space-y-4 sm:space-y-6">
          <CustomerProfile customerData={customerData} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(agents).map(([key, agent]) => (
              <AgentCard key={key} agent={agent} isActive={activeAgent === key} />
            ))}
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 relative">
            {isLoading && (
                <div className="absolute inset-0 bg-white/70 flex items-center justify-center rounded-lg z-10">
                    <RefreshCw className="animate-spin text-blue-500" size={32} />
                </div>
            )}
            <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center text-gray-700">
              <BarChart3 className="mr-2" size={20} /> Central de Comando
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <ActionButton onClick={handleAnalyzeRisk} disabled={isLoading} agentKey="insight" agents={agents}>
                <Brain className="mb-2" size={20} /> <span className="text-sm font-medium">Analisar Risco</span>
              </ActionButton>
              <button disabled className="w-full flex flex-col items-center justify-center p-4 rounded-lg text-white shadow-md bg-gray-400 cursor-not-allowed">
                <Zap className="mb-2" size={20} /> <span className="text-sm font-medium">Otimizar (Em breve)</span>
              </button>
              <ActionButton onClick={handleAnalyzeSecurity} disabled={isLoading} agentKey="guardian" agents={agents}>
                <Shield className="mb-2" size={20} /> <span className="text-sm font-medium">Analisar Segurança</span>
              </ActionButton>
            </div>
            
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium text-gray-700">Log de Ações dos Agentes</h4>
              <button onClick={fetchData} disabled={isLoading} className="text-sm bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-600 transition-colors flex items-center disabled:opacity-50">
                <RefreshCw size={14} className={`mr-2 ${isLoading ? 'animate-spin' : ''}`} /> Atualizar
              </button>
            </div>
            <ActionsLog actions={agentActions} agents={agents} />
          </div>
        </div>

        <div className="mt-6 bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <div><h3 className="font-semibold text-gray-800">Hackathon Bemobi</h3><p className="text-sm text-gray-600">Demonstração do Ecossistema Cortex Pay</p></div>
                <div className="grid grid-cols-3 gap-4 sm:flex sm:space-x-6 text-xs sm:text-sm text-gray-500">
                    <div className="flex items-center"><CheckCircle size={16} className="mr-1 text-green-500" /><span>Retenção +65%</span></div>
                    <div className="flex items-center"><TrendingUp size={16} className="mr-1 text-blue-500" /><span>Satisfação +85%</span></div>
                    <div className="flex items-center"><AlertTriangle size={16} className="mr-1 text-red-500" /><span>Inadimplência -70%</span></div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default BCP;