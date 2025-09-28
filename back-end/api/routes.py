# back-end/api/routes.py

from fastapi import APIRouter, HTTPException, Body, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

# --- NOVAS IMPORTAÇÕES (CORRIGIDAS) ---
from data import crud
from api import schemas
# ------------------------------------

# --- MUDANÇA PRINCIPAL AQUI (CORRIGIDA) ---
from data.database import get_db_session 
from data import models as db_models

# Importa os agentes
from agents import agent_insight, agent_guardian

router = APIRouter()


# --- NOVAS ROTAS CRUD ---

@router.post("/users", response_model=schemas.User, status_code=201, tags=["CRUD de Utilizadores"])
async def create_new_user(user: schemas.UserCreate, db: AsyncSession = Depends(get_db_session)):
    """
    Cria um novo utilizador.
    """
    return await crud.create_user(db=db, user=user)

@router.get("/users", response_model=List[schemas.User], tags=["CRUD de Utilizadores"])
async def read_all_users(skip: int = 0, limit: int = 100, db: AsyncSession = Depends(get_db_session)):
    """
    Lê uma lista de todos os utilizadores.
    """
    users = await crud.get_all_users(db, skip=skip, limit=limit)
    return users

@router.put("/users/{user_id}", response_model=schemas.User, tags=["CRUD de Utilizadores"])
async def update_existing_user(user_id: str, user: schemas.UserUpdate, db: AsyncSession = Depends(get_db_session)):
    """
    Atualiza um utilizador existente.
    """
    updated_user = await crud.update_user(db, user_id=user_id, user_update=user)
    if updated_user is None:
        raise HTTPException(status_code=404, detail="Utilizador não encontrado")
    return updated_user

@router.delete("/users/{user_id}", response_model=schemas.User, tags=["CRUD de Utilizadores"])
async def delete_existing_user(user_id: str, db: AsyncSession = Depends(get_db_session)):
    """
    Apaga um utilizador.
    """
    deleted_user = await crud.delete_user(db, user_id=user_id)
    if deleted_user is None:
        raise HTTPException(status_code=404, detail="Utilizador não encontrado")
    return deleted_user

# --- ROTAS DE SIMULAÇÃO E UTILITÁRIOS (EXISTENTES E ATUALIZADAS) ---

@router.get("/users/{user_id}", response_model=schemas.User, tags=["Simulação e Utilitários"])
async def get_user(user_id: str, db: AsyncSession = Depends(get_db_session)):
    """
    Lê os dados de um utilizador específico.
    """
    db_user = await crud.get_user(db, user_id=user_id) # Atualizado para usar a função crud
    if db_user is None:
        raise HTTPException(status_code=404, detail="Utilizador não encontrado")
    return db_user

@router.get("/users/{user_id}/notifications", tags=["Simulação e Utilitários"])
async def get_user_notifications(user_id: str, db: AsyncSession = Depends(get_db_session)):
    # NOTA: Lógica de maquete
    return []

@router.get("/events/log", tags=["Simulação e Utilitários"])
async def get_log(db: AsyncSession = Depends(get_db_session)):
    # NOTA: Lógica de maquete
    return []

@router.post("/actions/analyze-risk", tags=["Simulação e Utilitários"])
async def trigger_risk_analysis(payload: dict = Body(...), db: AsyncSession = Depends(get_db_session)):
    user_id = payload.get("userId")
    user = await crud.get_user(db, user_id=user_id)
    if not user:
        raise HTTPException(status_code=400, detail="userId inválido ou não fornecido")
    
    # A lógica do agente ainda precisa ser refatorada para não depender de db.json
    # agent_insight.analyze_risk(user_id, user_data) 
    
    return {"message": "Simulação de análise de risco iniciada."}

@router.post("/actions/analyze-security", tags=["Simulação e Utilitários"])
async def trigger_security_analysis(payload: dict = Body(...), db: AsyncSession = Depends(get_db_session)):
    user_id = payload.get("userId")
    user = await crud.get_user(db, user_id=user_id)
    if not user:
        raise HTTPException(status_code=400, detail="userId inválido ou não fornecido")
    
    # A lógica do agente ainda precisa ser refatorada
    # security_profile = agent_guardian.analyze_security_profile(user_id, user_data)
    # return security_profile
    return {"message": "Análise de segurança simulada."}

print("✅ Módulo de Rotas (CRUD e Simulação) foi lido e o router foi criado.")

