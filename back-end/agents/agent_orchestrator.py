# back-end/agents/agent_orchestrator.py

from services.cih import cih
from sqlalchemy.ext.asyncio import AsyncSession
from data import models as db_models

# A função do Orchestrator agora também pode receber a sessão da BD se precisar
# de consultar regras de negócio antes de decidir uma estratégia.
async def on_risk_detected(data: dict):
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
                "value": 89.90 # Valor para o Guardian validar
            }
        }
        # Publica um evento para VALIDAÇÃO, não para execução direta.
        cih.publish('VALIDATE_ACTION', strategy)

def initialize():
    cih.subscribe('RISK_DETECTED', on_risk_detected)
