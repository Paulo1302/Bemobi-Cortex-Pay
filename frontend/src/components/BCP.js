import React, { useState, useEffect, useRef } from 'react';
import { Brain, Shield, Zap, BarChart3, User, TrendingUp, CheckCircle, AlertTriangle, Target, MessageSquare, RefreshCw } from 'lucide-react';

// --- CAMADA DE SERVIÇO DE API ---
// Centraliza a comunicação com o back-end.
const API_BASE_URL = 'http://127.0.0.1:8000/api/v1';

const apiService = {
  getUser: (userId) => fetch(`${API_BASE_URL}/users/${userId}`).then(res => res.json()),
  getEventLog: () => fetch(`${API_BASE_URL}/events/log`).then(res => res.json()),
  analyzeRisk: (userId) => fetch(`${API_BASE_URL}/actions/analyze-risk`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId }),
  }),
  analyzeSecurity: (userId) => fetch(`${API_BASE_URL}/actions/analyze-security`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId }),
  }),
  // Futuramente:
  // optimizeFlow: (userId) => ...
};

// --- COMPONENTES DE UI MENORES ---

const Header = () => (
  <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-4 sm:mb-6">
    <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
      <div className="flex items-center space-x-3">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-2 sm:p-3 rounded-lg">
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

const CustomerProfile = ({ customerData }) => {
  if (!customerData) return <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 text-center">Carregando perfil do cliente...</div>;

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <User className="mr-2" size={18} /> Perfil do Cliente
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
            <div><span className="text-gray-600 block">Nome:</span><span className="font-medium">{customerData.name}</span></div>
            <div><span className="text-gray-600 block">Último Pagto:</span><span className="font-medium">{customerData.lastPayment}</span></div>
            <div><span className="text-gray-600 block">Horário Médio:</span><span className="font-medium">{customerData.avgPaymentTime}</span></div>
            <div><span className="text-gray-600 block">Próxima Conta:</span><span className="font-medium">R$ {customerData.nextBill?.amount}</span></div>
            <div><span className="text-gray-600 block">Histórico:</span><span className="font-medium text-green-600">{customerData.paymentHistory}</span></div>
            <div><span className="text-gray-600 block">Método Preferido:</span><span className="font-medium">{customerData.preferredMethod}</span></div>
          </div>
        </div>
        <div className="flex flex-row sm:flex-col space-x-4 sm:space-x-0 sm:space-y-3">
          <div className="text-center p-3 bg-green-50 rounded-lg flex-1 sm:flex-none">
            <div className="text-lg sm:text-xl font-bold text-green-600">92%</div><div className="text-xs text-gray-600">Pontualidade</div>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg flex-1 sm:flex-none">
            <div className="text-lg sm:text-xl font-bold text-blue-600">Baixo</div><div className="text-xs text-gray-600">Risco</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AgentCard = ({ agent, isActive }) => {
    const Icon = agent.icon;
    return (
      <div className={`p-4 rounded-lg transition-all ${isActive ? `${agent.color} text-white shadow-lg` : 'bg-white border-2 border-gray-200 shadow-sm'}`}>
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

const ActionsLog = ({ actions, agents }) => {
    const logContainerRef = useRef(null);

    useEffect(() => {
        // Scroll to bottom when new actions are added
        if (logContainerRef.current) {
            logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
        }
    }, [actions]);

    return (
        <div ref={logContainerRef} className="bg-gray-50 rounded-lg p-3 max-h-64 overflow-y-auto">
          {actions.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <Target className="mx-auto mb-3 text-gray-300" size={32} />
              <p className="text-sm">Nenhuma ação executada ainda</p>
              <p className="text-xs text-gray-400">Clique em um botão acima para começar</p>
            </div>
          ) : (
            <div className="space-y-2">
              {actions.map((action, index) => (
                <div key={index} className="bg-white p-3 rounded border-l-4 border-blue-400 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${agents[action.agent]?.color}`}></div>
                      <span className="font-medium text-blue-600 text-sm">{agents[action.agent]?.name || 'Sistema'}</span>
                    </div>
                    <span className="text-gray-500 text-xs">{new Date(action.timestamp).toLocaleTimeString()}</span>
                  </div>
                  <p className="text-gray-700 text-sm mb-2">{action.action}</p>
                  {action.details && <pre className="text-xs text-gray-600 bg-gray-50 p-2 rounded whitespace-pre-wrap font-sans">{JSON.stringify(action.details, null, 2)}</pre>}
                </div>
              ))}
            </div>
          )}
        </div>
    );
};

// --- COMPONENTE PRINCIPAL ---

const BCP = () => {
  const [customerData, setCustomerData] = useState(null);
  const [agentActions, setAgentActions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeAgent, setActiveAgent] = useState(null); // Para destacar o card do agente ativo

  const USER_ID = 'joao_silva'; // ID do cliente para a demonstração

  const agents = {
    insight: { name: 'Agent Insight', role: 'Analista Preditivo', icon: Brain, color: 'bg-blue-500', description: 'Analisa padrões e prediz riscos financeiros' },
    grace: { name: 'Agent Grace Plus', role: 'Conselheiro Empático', icon: MessageSquare, color: 'bg-green-500', description: 'Comunicação personalizada e suporte' },
    guardian: { name: 'Agent Guardian', role: 'Protetor Personalizado', icon: Shield, color: 'bg-red-500', description: 'Segurança adaptativa baseada no perfil' },
    orchestrator: { name: 'Agent Orchestrator', role: 'O Maestro', icon: Zap, color: 'bg-purple-500', description: 'Coordena e decide as melhores ações' },
  };

  // Função para carregar todos os dados do back-end
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
      setError('Falha ao carregar dados do servidor.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Carrega os dados iniciais quando o componente é montado
  useEffect(() => {
    fetchData();
  }, []);

  // Funções que interagem com a API
  const handleAction = async (actionType, apiCall, agentKey) => {
    setIsLoading(true);
    setError(null);
    setActiveAgent(agentKey);
    try {
      await apiCall(USER_ID);
      // Após a ação, busca o log de eventos atualizado
      const updatedLog = await apiService.getEventLog();
      setAgentActions(updatedLog);
    } catch (err) {
      setError(`Falha ao executar a ação: ${actionType}`);
      console.error(err);
    } finally {
      setIsLoading(false);
      setTimeout(() => setActiveAgent(null), 2000); // Remove o destaque após 2s
    }
  };

  const handleAnalyzeRisk = () => handleAction('Analisar Risco', apiService.analyzeRisk, 'insight');
  const handleAnalyzeSecurity = () => handleAction('Analisar Segurança', apiService.analyzeSecurity, 'guardian');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto px-4 py-4 sm:py-6">
        <Header />
        
        {error && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded" role="alert"><p>{error}</p></div>}

        <div className="space-y-4 sm:space-y-6">
          <CustomerProfile customerData={customerData} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(agents).map(([key, agent]) => (
              <AgentCard key={key} agent={agent} isActive={activeAgent === key} />
            ))}
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center">
              <BarChart3 className="mr-2" size={20} /> Central de Comando
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              <button onClick={handleAnalyzeRisk} disabled={isLoading} className="..."><Brain className="mx-auto mb-2" /> Analisar Risco</button>
              <button disabled className="... bg-gray-300 cursor-not-allowed"><Zap className="mx-auto mb-2" /> Otimizar Fluxo (Em breve)</button>
              <button onClick={handleAnalyzeSecurity} disabled={isLoading} className="..."><Shield className="mx-auto mb-2" /> Analisar Segurança</button>
            </div>
            
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium text-gray-700">Log de Ações dos Agentes</h4>
              <button onClick={fetchData} disabled={isLoading} className="text-sm bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 transition-colors flex items-center">
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