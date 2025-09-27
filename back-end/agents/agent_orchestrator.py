# agents/agent_orchestrator.py
from services.cih import cih
from data.database import db

def on_risk_detected(data: dict):
    user_id = data['userId']
    analysis = data['analysis']
    print(f"🎼 [ORCHESTRATOR] Risco detectado para '{user_id}'. Decidindo estratégia...")

    if analysis['riskScore'] > 70:
        strategy = {
            "userId": user_id,
            "action": "PREVENTIVE_INTERVENTION",
            "details": {
                "method": "SMS + Push",
                "tone": "Empático",
                "options": ["Parcelar 2x", "Desconto 5%", "Adiar 5 dias"],
                "value": 89.90 # Adicionando um valor para o Guardian validar
            }
        }
        # Modificação: Publica um evento para VALIDAÇÃO, não para execução.
        cih.publish('VALIDATE_ACTION', strategy)

        db.add_event_log({
            "agent": "orchestrator",
            "action": "Estratégia Decidida, Aguardando Validação",
            "details": f"Plano '{strategy['action']}' enviado para o Guardian."
        })

def initialize():
    cih.subscribe('RISK_DETECTED', on_risk_detected)