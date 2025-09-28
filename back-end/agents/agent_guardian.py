# back-end/agents/agent_guardian.py

from services.cih import cih
# Não precisa mais de importar 'db'

def analyze_security_profile(user_id: str, user_data: dict) -> dict:
    """Retorna o perfil de segurança adaptativo do utilizador."""
    print(f"🛡️  [GUARDIAN] Analisando perfil de segurança para '{user_id}'...")
    profile = user_data.get('security_profile', {})

    security_analysis = {
        "profile": profile.get('profileType', 'Desconhecido'),
        "riskLevel": "Baixo",
        "currentProtection": "Ativo",
        "adaptations": [
            f"Biometria facial habilitada para valores > R$ 200" if profile.get('biometricsEnabled') else "Biometria não habilitada",
            f"Limite dinâmico: R$ {profile.get('dynamicLimit', 0)} (baseado no histórico)",
            "Alertas SMS automáticos para transações noturnas",
        ],
    }
    
    # A lógica de logging também seria movida
    return security_analysis

def on_validate_action(data: dict):
    # Esta lógica continua a mesma, pois já recebe os dados via CIH
    pass

def initialize():
    cih.subscribe('VALIDATE_ACTION', on_validate_action)
