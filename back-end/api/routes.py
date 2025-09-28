from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from datetime import timedelta

# Importa toda a lógica necessária das outras pastas
from data import crud
from api import schemas
from data.database import get_db_session
from core.security import create_access_token, get_current_active_user, ACCESS_TOKEN_EXPIRE_MINUTES

router = APIRouter()

# --- ENDPOINT DE LOGIN ---
@router.post("/token", response_model=schemas.Token, tags=["Autenticação"])
async def login_for_access_token(db: AsyncSession = Depends(get_db_session), form_data: OAuth2PasswordRequestForm = Depends()):
    """
    Autentica o utilizador com CPF (no campo username) e senha.
    Retorna um token de acesso JWT se as credenciais forem válidas.
    """
    user = await crud.authenticate_user(db, cpf=form_data.username, password=form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="CPF ou senha incorretos",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.cpf}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

# --- ROTAS PROTEGIDAS ---
@router.get("/users/me", response_model=schemas.User, tags=["Autenticação"])
async def read_users_me(current_user: schemas.User = Depends(get_current_active_user)):
    """
    Rota de exemplo protegida. Retorna os dados do utilizador
    atualmente autenticado. Só funciona se um token válido for enviado.
    """
    return current_user

# --- ROTAS CRUD ---
@router.post("/users", response_model=schemas.User, status_code=201, tags=["CRUD de Utilizadores"])
async def create_new_user(user: schemas.UserCreate, db: AsyncSession = Depends(get_db_session)):
    """
    Cria um novo utilizador. Verifica primeiro se o CPF já existe.
    """
    db_user = await crud.get_user_by_cpf(db, cpf=user.cpf)
    if db_user:
        raise HTTPException(status_code=400, detail="CPF já registado")
    return await crud.create_user(db=db, user=user)

@router.get("/users", response_model=List[schemas.User], tags=["CRUD de Utilizadores"])
async def read_all_users(skip: int = 0, limit: int = 100, db: AsyncSession = Depends(get_db_session)):
    """Lê uma lista de todos os utilizadores."""
    return await crud.get_all_users(db, skip=skip, limit=limit)

@router.get("/users/{user_id}", response_model=schemas.User, tags=["CRUD de Utilizadores"])
async def read_user(user_id: str, db: AsyncSession = Depends(get_db_session)):
    """Lê os dados de um utilizador específico pelo seu ID."""
    db_user = await crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="Utilizador não encontrado")
    return db_user

@router.put("/users/{user_id}", response_model=schemas.User, tags=["CRUD de Utilizadores"])
async def update_existing_user(user_id: str, user: schemas.UserUpdate, db: AsyncSession = Depends(get_db_session)):
    """Atualiza um utilizador existente."""
    updated_user = await crud.update_user(db, user_id=user_id, user_update=user)
    if updated_user is None:
        raise HTTPException(status_code=404, detail="Utilizador não encontrado")
    return updated_user

@router.delete("/users/{user_id}", response_model=schemas.User, tags=["CRUD de Utilizadores"])
async def delete_existing_user(user_id: str, db: AsyncSession = Depends(get_db_session)):
    """Apaga um utilizador."""
    deleted_user = await crud.delete_user(db, user_id=user_id)
    if deleted_user is None:
        raise HTTPException(status_code=404, detail="Utilizador não encontrado")
    return deleted_user

