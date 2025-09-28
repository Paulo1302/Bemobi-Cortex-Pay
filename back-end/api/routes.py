# api/routes.py

from fastapi import APIRouter, HTTPException, Body
from data.database import db
from agents import agent_insight, agent_guardian

# Cria uma instância do Router. É aqui que vamos registrar todas as rotas da API.
router = APIRouter()

@router.get("/users")
def get_all_users():
    user = db.get_all_users()
    if not user:
        raise HTTPException(status_code=404, detail="Nenhum usuário encontrado")
    return user

@router.get("/users/{user_id}")
def get_user(user_id: str):
    user = db.get_user(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    return user

@router.get("/users/{user_id}/notifications")
def get_user_notifications(user_id: str):
    notifications = db.get_notifications(user_id)
    if notifications is None:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    return notifications

@router.get("/events/log")
def get_log():
    return db.get_event_log()

@router.post("/actions/analyze-risk")
def trigger_risk_analysis(payload: dict = Body(...)):
    user_id = payload.get("userId")
    if not user_id or not db.get_user(user_id):
        raise HTTPException(status_code=400, detail="userId inválido ou não fornecido")
    
    agent_insight.analyze_risk(user_id)
    
    return {"message": "Simulação de análise de risco iniciada."}

@router.post("/actions/analyze-security")
def trigger_security_analysis(payload: dict = Body(...)):
    user_id = payload.get("userId")
    if not user_id or not db.get_user(user_id):
        raise HTTPException(status_code=400, detail="userId inválido ou não fornecido")
    
    security_profile = agent_guardian.analyze_security_profile(user_id)
    return security_profile

# Adicionamos este print para depuração
print("✅ Módulo de Rotas (api/routes.py) foi lido e o router foi criado.")