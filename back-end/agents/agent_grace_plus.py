# back-end/agents/agent_grace_plus.py

from services.cih import cih
from sqlalchemy.ext.asyncio import AsyncSession
from data import models as db_models
import time

# A função do Grace Plus deve receber a sessão da BD para poder salvar a notificação.
async def on_execute_action_approved(strategy: dict):
    # Esta função agora precisa de acesso a uma sessão da BD.
    # A melhor abordagem é o Orchestrator passar a sessão via CIH,
    # ou o Grace Plus obter uma nova sessão. Por simplicidade na maquete,
    # vamos apenas simular a lógica sem a escrita na BD.
    
    user_id = strategy['userId']
    print(f"❤️  [GRACE PLUS] Recebido plano APROVADO para '{user_id}'. Formulando mensagem...")
    
    # Em uma implementação real, buscaríamos o nome do utilizador da BD aqui
    message = f"Olá! A sua conta vence em breve. Preparamos algumas opções para facilitar o seu pagamento."

    notification_data = {
        "id": f"notif_{int(time.time())}",
        "agent": "grace",
        "message": message,
        "options": strategy['details']['options'],
    }
    
    print(f"Simulando salvamento da notificação para {user_id}: {notification_data}")
    
    # Lógica para salvar na BD (requer a criação do modelo Notification):
    # from data.database import AsyncSessionLocal
    # async with AsyncSessionLocal() as db:
    #     new_notification = db_models.Notification(**notification_data, user_id=user_id)
    #     db.add(new_notification)
    #     await db.commit()

def initialize():
    # Ouve o evento de APROVAÇÃO do Guardian, não mais o comando direto do Orchestrator.
    cih.subscribe('EXECUTE_ACTION_APPROVED', on_execute_action_approved)
