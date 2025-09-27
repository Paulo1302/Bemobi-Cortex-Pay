import React, { useState, useEffect } from 'react';
import { Brain, Shield, Settings, BarChart3, User, TrendingUp, CheckCircle, AlertTriangle, Zap, Target } from 'lucide-react';

const BemobiCognitiveEngine = () => {
  const [activeAgent, setActiveAgent] = useState('insight');
  const [customerData, setCustomerData] = useState({
    name: 'João Silva',
    lastPayment: '2024-11-28', // Dado real: última transação
    avgPaymentTime: '20:30', // Dado real: horário médio de pagamentos
    nextBill: { amount: 89.90, dueDate: '2024-12-15', service: 'Claro' },
    paymentHistory: '8/10 pagamentos pontuais', // Dado real: histórico
    preferredMethod: 'Pix', // Dado real: método mais usado
    riskScore: 'Calculado por IA', // Baseado em dados reais
    dataSource: 'Histórico Bemobi Pay + Smart Checkout'
  });
  
  const [agentActions, setAgentActions] = useState([]);
  const [activeDemo, setActiveDemo] = useState(null);

  const agents = {
    insight: {
      name: 'Agent Insight',
      role: 'Analista Preditivo',
      icon: Brain,
      color: 'bg-blue-500',
      description: 'Analisa padrões e prediz riscos financeiros'
    },
    grace: {
      name: 'Agent Grace Plus',
      role: 'Conselheiro Empático',
      icon: Brain,
      color: 'bg-green-500',
      description: 'Comunicação personalizada e suporte emocional'
    },
    guardian: {
      name: 'Agent Guardian',
      role: 'Protetor Personalizado',
      icon: Shield,
      color: 'bg-red-500',
      description: 'Segurança adaptativa baseada no perfil'
    },
    optimizer: {
      name: 'Agent Optimizer',
      role: 'Facilitador Inteligente',
      icon: Zap,
      color: 'bg-purple-500',
      description: 'Otimização de fluxos e experiência'
    }
  };

  const scrollToBottom = () => {
    // Removido - não usado mais
  };

  useEffect(() => {
    // Removido scroll automático
  }, []);

  // Simula análise do Agent Insight
  const analyzeRisk = () => {
    setActiveDemo('insight');
    const analysis = {
      riskScore: 78,
      factors: [
        'Histórico de atrasos: 2 ocorrências nos últimos 6 meses',
        'Padrão de gastos: 15% acima da média mensal',
        'Próximo salário: Estimado para 10 dias',
        'Sazonalidade: Dezembro - gastos 30% maiores'
      ],
      prediction: 'Risco moderado de inadimplência nos próximos 5 dias',
      confidence: 87,
      recommendation: 'Ação preventiva recomendada'
    };
    
    setAgentActions(prev => [...prev, {
      agent: 'insight',
      action: 'Análise de Risco Concluída',
      details: analysis,
      timestamp: new Date().toLocaleTimeString()
    }]);

    // Aciona intervenção automática
    setTimeout(() => triggerAutomaticIntervention(analysis), 2000);
  };

  // Simula intervenção automática
  const triggerAutomaticIntervention = (analysis) => {
    setAgentActions(prev => [...prev, {
      agent: 'grace',
      action: 'Intervenção Preventiva Ativada',
      details: { 
        method: 'SMS + Push', 
        tone: 'Empático', 
        options: ['Parcelar 2x', 'Desconto 5%', 'Adiar 5 dias'],
        message: `Olá João! Sua conta da Claro vence em breve. Preparei algumas opções para facilitar seu pagamento.`
      },
      timestamp: new Date().toLocaleTimeString()
    }]);
  };

  // Simula otimização do Agent Optimizer
  const optimizeFlow = () => {
    setActiveDemo('optimizer');
    const optimization = {
      currentFlow: '7 passos, 45 segundos médios',
      optimizedFlow: '3 passos, 15 segundos médios',
      improvements: [
        'Pré-seleção do método preferido (Pix)',
        'Auto-preenchimento de dados do cliente',
        'Remoção de confirmações redundantes',
        'Interface adaptada ao perfil mobile-first'
      ],
      expectedImpact: '+40% conversão, +60% satisfação',
      implementation: 'Aplicado automaticamente para este perfil'
    };

    setAgentActions(prev => [...prev, {
      agent: 'optimizer',
      action: 'Fluxo Otimizado para Perfil',
      details: optimization,
      timestamp: new Date().toLocaleTimeString()
    }]);
  };

  // Simula análise de segurança do Guardian
  const analyzeSecurity = () => {
    setActiveDemo('guardian');
    const security = {
      profile: 'Usuário Padrão - Mobile First',
      riskLevel: 'Baixo',
      currentProtection: 'Ativo',
      adaptations: [
        'Biometria facial habilitada para valores > R$ 200',
        'Limite dinâmico: R$ 500 (baseado no histórico)',
        'Alertas SMS automáticos para transações noturnas',
        'Proteção geográfica: bloqueio fora da região habitual'
      ],
      lastUpdate: 'Perfil atualizado há 2 dias',
      effectiveness: '99.2% de precisão na detecção'
    };

    setAgentActions(prev => [...prev, {
      agent: 'guardian',
      action: 'Perfil de Segurança Atualizado',
      details: security,
      timestamp: new Date().toLocaleTimeString()
    }]);
  };

  const clearDemo = () => {
    setAgentActions([]);
    setActiveDemo(null);
  };

  const AgentCard = ({ agentKey, agent }) => {
    const Icon = agent.icon;
    const isActive = activeDemo === agentKey;
    
    return (
      <div 
        className={`p-4 rounded-lg cursor-pointer transition-all transform hover:scale-105 ${
          isActive
            ? `${agent.color} text-white shadow-lg` 
            : 'bg-white border-2 border-gray-200 hover:border-blue-300 shadow-sm'
        }`}
        onClick={() => setActiveAgent(agentKey)}
      >
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${isActive ? 'bg-white/20' : agent.color.replace('bg-', 'bg-') + ' text-white'}`}>
            <Icon size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm">{agent.name}</h3>
            <p className={`text-xs ${isActive ? 'text-gray-100' : 'text-gray-600'} truncate`}>
              {agent.role}
            </p>
          </div>
          {isActive && (
            <div className="flex-shrink-0">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            </div>
          )}
        </div>
        <p className={`text-xs mt-2 ${isActive ? 'text-gray-100' : 'text-gray-500'}`}>
          {agent.description}
        </p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto px-4 py-4 sm:py-6">
        {/* Header - Mobile Optimized */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-2 sm:p-3 rounded-lg">
                <Brain size={24} className="sm:w-8 sm:h-8" />
              </div>
              <div>
                <h1 className="text-xl sm:text-3xl font-bold text-gray-800">Bemobi Cognitive Engine</h1>
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

        {/* Mobile-First Layout */}
        <div className="space-y-4 sm:space-y-6">
          
          {/* Customer Profile - Full Width on Mobile */}
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <User className="mr-2" size={18} />
                  Perfil do Cliente
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
                  <div>
                    <span className="text-gray-600 block">Nome:</span>
                    <span className="font-medium">{customerData.name}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 block">Último Pagto:</span>
                    <span className="font-medium">{customerData.lastPayment}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 block">Horário Médio:</span>
                    <span className="font-medium">{customerData.avgPaymentTime}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 block">Próxima Conta:</span>
                    <span className="font-medium">R$ {customerData.nextBill.amount}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 block">Histórico:</span>
                    <span className="font-medium text-green-600">{customerData.paymentHistory}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 block">Método Preferido:</span>
                    <span className="font-medium">{customerData.preferredMethod}</span>
                  </div>
                </div>
              </div>
              
              {/* Quick Stats */}
              <div className="flex flex-row sm:flex-col space-x-4 sm:space-x-0 sm:space-y-3">
                <div className="text-center p-3 bg-green-50 rounded-lg flex-1 sm:flex-none">
                  <div className="text-lg sm:text-xl font-bold text-green-600">92%</div>
                  <div className="text-xs text-gray-600">Pontualidade</div>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg flex-1 sm:flex-none">
                  <div className="text-lg sm:text-xl font-bold text-blue-600">Baixo</div>
                  <div className="text-xs text-gray-600">Risco</div>
                </div>
              </div>
            </div>
          </div>

          {/* Agents Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(agents).map(([key, agent]) => (
              <AgentCard key={key} agentKey={key} agent={agent} />
            ))}
          </div>

          {/* Control Panel */}
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center">
              <BarChart3 className="mr-2" size={20} />
              Central de Comando
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              <button 
                onClick={analyzeRisk}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 shadow-md"
              >
                <Brain className="mx-auto mb-2" size={20} />
                <div className="text-sm font-medium">Analisar Risco</div>
              </button>
              <button 
                onClick={optimizeFlow}
                className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-md"
              >
                <Zap className="mx-auto mb-2" size={20} />
                <div className="text-sm font-medium">Otimizar Fluxo</div>
              </button>
              <button 
                onClick={analyzeSecurity}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white p-4 rounded-lg hover:from-red-600 hover:to-red-700 transition-all transform hover:scale-105 shadow-md"
              >
                <Shield className="mx-auto mb-2" size={20} />
                <div className="text-sm font-medium">Analisar Segurança</div>
              </button>
            </div>

            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium text-gray-700">Log de Ações dos Agentes</h4>
              <button 
                onClick={clearDemo}
                className="text-sm bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 transition-colors"
              >
                Limpar
              </button>
            </div>

            {/* Actions Log - Mobile Optimized */}
            <div className="bg-gray-50 rounded-lg p-3 max-h-64 overflow-y-auto">
              {agentActions.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  <Target className="mx-auto mb-3 text-gray-300" size={32} />
                  <p className="text-sm">Nenhuma ação executada ainda</p>
                  <p className="text-xs text-gray-400">Clique em um botão acima para começar</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {agentActions.map((action, index) => (
                    <div key={index} className="bg-white p-3 rounded border-l-4 border-blue-400 shadow-sm">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                        <div className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full ${agents[action.agent].color.replace('bg-', 'bg-')}`}></div>
                          <span className="font-medium text-blue-600 text-sm">{agents[action.agent].name}</span>
                        </div>
                        <span className="text-gray-500 text-xs">{action.timestamp}</span>
                      </div>
                      <p className="text-gray-700 text-sm mb-2">{action.action}</p>
                      {action.details && (
                        <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                          {typeof action.details === 'object' ? (
                            <div className="space-y-1">
                              {Object.entries(action.details).slice(0, 3).map(([key, value]) => (
                                <div key={key}>
                                  <span className="font-medium capitalize">{key.replace('_', ' ')}:</span> {
                                    Array.isArray(value) ? value.join(', ') : String(value)
                                  }
                                </div>
                              ))}
                            </div>
                          ) : (
                            action.details
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Stats */}
        <div className="mt-6 bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div>
              <h3 className="font-semibold text-gray-800">Hackathon Bemobi 2024</h3>
              <p className="text-sm text-gray-600">Demonstração do Ecossistema de Agentes IA</p>
            </div>
            <div className="grid grid-cols-3 gap-4 sm:flex sm:space-x-6 text-xs sm:text-sm text-gray-500">
              <div className="flex items-center justify-center sm:justify-start">
                <CheckCircle size={16} className="mr-1 text-green-500 flex-shrink-0" /> 
                <span>Retenção +65%</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start">
                <TrendingUp size={16} className="mr-1 text-blue-500 flex-shrink-0" /> 
                <span>Satisfação +85%</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start">
                <AlertTriangle size={16} className="mr-1 text-red-500 flex-shrink-0" /> 
                <span>Inadimplência -70%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ); />
}
};

export default BemobiCognitiveEngine;