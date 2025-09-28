# back-end/api/routes.py

from fastapi import APIRouter, HTTPException, Body, Depends
from sqlalchemy.ext.asyncio import AsyncSession

# --- MUDANÇA PRINCIPAL AQUI ---
# Importa o mecanismo de sessão e os modelos da pasta 'data'
from data.database import get_db_session
from data import models as db_models

# Importa os agentes
from agents import agent_insight, agent_guardian

router = APIRouter()

@router.get("/users/{user_id}")
async def get_user(user_id: str, db: AsyncSession = Depends(get_db_session)):
    user = await db.get(db_models.User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="Utilizador não encontrado")
    return user

@router.get("/users/{user_id}/notifications")
async def get_user_notifications(user_id: str, db: AsyncSession = Depends(get_db_session)):
    # NOTA: Lógica de maquete
    return []

@router.get("/events/log")
async def get_log(db: AsyncSession = Depends(get_db_session)):
    # NOTA: Lógica de maquete
    return []

@router.post("/actions/analyze-risk")
async def trigger_risk_analysis(payload: dict = Body(...), db: AsyncSession = Depends(get_db_session)):
    user_id = payload.get("userId")
    user = await db.get(db_models.User, user_id)
    if not user:
        raise HTTPException(status_code=400, detail="userId inválido ou não fornecido")
    
    user_data = {c.name: getattr(user, c.name) for c in user.__table__.columns}
    # A lógica do agente ainda precisa ser refatorada para não depender de db.json
    # agent_insight.analyze_risk(user_id, user_data) 
    
    return {"message": "Simulação de análise de risco iniciada."}

@router.post("/actions/analyze-security")
async def trigger_security_analysis(payload: dict = Body(...), db: AsyncSession = Depends(get_db_session)):
    user_id = payload.get("userId")
    user = await db.get(db_models.User, user_id)
    if not user:
        raise HTTPException(status_code=400, detail="userId inválido ou não fornecido")
    
    user_data = {c.name: getattr(user, c.name) for c in user.__table__.columns}
    # A lógica do agente ainda precisa ser refatorada
    # security_profile = agent_guardian.analyze_security_profile(user_id, user_data)
    # return security_profile
    return {"message": "Análise de segurança simulada."}

print("✅ Módulo de Rotas (api/routes.py) foi lido e o router foi criado.")
