# agents/agent_insight.py
from services.cih import cih
from data.database import db

def analyze_risk(user_id: str):
    print(f"👁️  [INSIGHT] Analisando risco para o usuário: {user_id}")
    user = db.get_user(user_id)

    # Lógica de ML simulada
    analysis = {
      "riskScore": 78,
      "factors": [
        "Histórico de atrasos: 2 ocorrências nos últimos 6 meses",
        "Padrão de gastos: 15% acima da média mensal",
      ],
      "prediction": "Risco moderado de inadimplência nos próximos 5 dias",
    }

    cih.publish('RISK_DETECTED', {"userId": user_id, "analysis": analysis})
    
    db.add_event_log({
        "agent": "insight",
        "action": "Análise de Risco Concluída",
        "details": analysis
    })