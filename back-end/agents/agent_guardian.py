# agents/agent_guardian.py
from services.cih import cih
from data.database import db

def analyze_security_profile(user_id: str) -> dict:
    """Retorna o perfil de segurança adaptativo do usuário, simulando a lógica do JS."""
    print(f"🛡️  [GUARDIAN] Analisando perfil de segurança para '{user_id}'...")
    user = db.get_user(user_id)
    profile = user.get('securityProfile', {})

    security_analysis = {
        "profile": profile.get('profileType', 'Desconhecido'),
        "riskLevel": "Baixo", # Simulado
        "currentProtection": "Ativo",
        "adaptations": [
            f"Biometria facial habilitada para valores > R$ 200" if profile.get('biometricsEnabled') else "Biometria não habilitada",
            f"Limite dinâmico: R$ {profile.get('dynamicLimit', 0)} (baseado no histórico)",
            "Alertas SMS automáticos para transações noturnas",
            f"Proteção geográfica: bloqueio fora de '{profile.get('usualRegion', 'N/A')}'"
        ],
        "effectiveness": "99.2% de precisão na detecção"
    }
    
    db.add_event_log({
        "agent": "guardian",
        "action": "Perfil de Segurança Analisado",
        "details": security_analysis
    })
    return security_analysis

def on_validate_action(data: dict):
    """Intercepta uma ação para validar suas regras de segurança."""
    user_id = data['userId']
    user = db.get_user(user_id)
    security_profile = user.get('securityProfile', {})
    
    print(f"🛡️  [GUARDIAN] Validando ação para '{user_id}'...")

    # --- SIMULAÇÃO DAS REGRAS ADAPTATIVAS ---
    is_safe = True
    rejection_reason = ""

    # Exemplo de regra: A oferta de parcelamento envolve um valor alto?
    action_value = data.get('details', {}).get('value', 0)
    if action_value > security_profile.get('dynamicLimit', 500):
        is_safe = False
        rejection_reason = f"Valor da ação (R$ {action_value}) excede o limite dinâmico de R$ {security_profile.get('dynamicLimit')}."

    # Adicione outras regras aqui (geográfica, noturna, etc.)

    if is_safe:
        print(f"✅ [GUARDIAN] Ação APROVADA. Encaminhando para execução.")
        db.add_event_log({"agent": "guardian", "action": "Ação Aprovada", "details": data})
        # Se for seguro, o Guardian publica o evento final para o Grace Plus
        cih.publish('EXECUTE_ACTION', data)
    else:
        print(f"❌ [GUARDIAN] Ação REPROVADA. Motivo: {rejection_reason}")
        db.add_event_log({"agent": "guardian", "action": "Ação Reprovada", "details": {"reason": rejection_reason}})


def initialize():
    # Se inscreve para interceptar e validar ações
    cih.subscribe('VALIDATE_ACTION', on_validate_action)