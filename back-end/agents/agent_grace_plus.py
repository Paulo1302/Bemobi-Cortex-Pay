# agents/agent_grace_plus.py
from services.cih import cih
from data.database import db
import time

def on_execute_action(strategy: dict):
    if strategy['action'] == 'PREVENTIVE_INTERVENTION':
        user_id = strategy['userId']
        print(f"❤️  [GRACE PLUS] Recebido plano de intervenção para '{user_id}'. Formulando mensagem...")
        
        user = db.get_user(user_id)
        message = f"Olá {user['name']}! Sua conta da {user['nextBill']['service']} vence em breve. Preparei algumas opções para facilitar seu pagamento."

        notification = {
            "id": f"notif_{int(time.time())}",
            "agent": "grace",
            "message": message,
            "options": strategy['details']['options'],
        }
        
        db.add_notification(user_id, notification)
        
        db.add_event_log({
            "agent": "grace",
            "action": "Intervenção Preventiva Ativada",
            "details": {"message": message, "options": strategy['details']['options']}
        })

def initialize():
    cih.subscribe('EXECUTE_ACTION', on_execute_action)