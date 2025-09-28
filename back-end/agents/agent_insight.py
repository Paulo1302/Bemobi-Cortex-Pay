# back-end/agents/agent_insight.py

from services.cih import cih

# A função agora espera receber os dados do utilizador
def analyze_risk(user_id: str, user_data: dict):
    print(f"👁️  [INSIGHT] Analisando risco para o utilizador: {user_id}")
    
    # Lógica de ML simulada que agora usa os dados recebidos
    analysis = {
      "riskScore": 78,
      "factors": [
        "Histórico de atrasos analisado.",
        f"Padrão de gastos de {user_data.get('name')} analisado.",
      ],
      "prediction": "Risco moderado de inadimplência nos próximos 5 dias",
    }

    cih.publish('RISK_DETECTED', {"userId": user_id, "analysis": analysis})
    
    # A lógica de salvar o log deve ser movida para a camada da API
    # ou para um serviço de logging dedicado. Por agora, vamos simplificar.
