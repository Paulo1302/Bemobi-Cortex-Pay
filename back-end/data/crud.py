import uuid
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

# Importa os modelos da base de dados e os esquemas da API
from . import models
from api import schemas
# Importa as funções de segurança da pasta 'core'
from core.security import get_password_hash, verify_password

# --- FUNÇÕES DE AUTENTICAÇÃO ---

async def get_user_by_cpf(db: AsyncSession, cpf: str):
    """Busca um único utilizador pelo seu CPF."""
    result = await db.execute(select(models.User).filter(models.User.cpf == cpf))
    return result.scalars().first()

async def authenticate_user(db: AsyncSession, cpf: str, password: str):
    """Autentica um utilizador, verificando a senha."""
    user = await get_user_by_cpf(db, cpf=cpf)
    # Verifica se o utilizador existe E se a senha fornecida corresponde ao hash guardado
    if not user or not verify_password(password, user.hashed_password):
        return None
    return user

# --- FUNÇÕES CRUD ---

async def get_user(db: AsyncSession, user_id: str):
    """Busca um único utilizador pelo seu ID."""
    result = await db.execute(select(models.User).filter(models.User.id == user_id))
    return result.scalars().first()

async def get_all_users(db: AsyncSession, skip: int = 0, limit: int = 100):
    """Busca todos os utilizadores com paginação."""
    result = await db.execute(select(models.User).offset(skip).limit(limit))
    return result.scalars().all()

async def create_user(db: AsyncSession, user: schemas.UserCreate):
    """Cria um novo utilizador, guardando a senha com hash."""
    # Gera o hash da senha antes de guardar na base de dados
    hashed_password = get_password_hash(user.password)
    new_user = models.User(
        id=str(uuid.uuid4()),
        name=user.name,
        cpf=user.cpf,
        hashed_password=hashed_password, # Guarda o hash, não a senha original
        status=user.status,
        is_high_value=user.is_high_value,
        financial_features=user.financial_features,
        security_profile=user.security_profile
    )
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)
    return new_user

async def update_user(db: AsyncSession, user_id: str, user_update: schemas.UserUpdate):
    """Atualiza os dados de um utilizador existente."""
    db_user = await get_user(db, user_id)
    if not db_user:
        return None
    
    update_data = user_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_user, key, value)
        
    await db.commit()
    await db.refresh(db_user)
    return db_user

async def delete_user(db: AsyncSession, user_id: str):
    """Apaga um utilizador da base de dados."""
    db_user = await get_user(db, user_id)
    if not db_user:
        return None
        
    await db.delete(db_user)
    await db.commit()
    return db_user

