import uuid
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

# Importa os modelos da base de dados e os esquemas da API
from . import models
from api import schemas

# --- Funções CRUD para o modelo User ---

async def get_user(db: AsyncSession, user_id: str):
    """Busca um único utilizador pelo seu ID."""
    result = await db.execute(select(models.User).filter(models.User.id == user_id))
    return result.scalars().first()

async def get_all_users(db: AsyncSession, skip: int = 0, limit: int = 100):
    """Busca todos os utilizadores com paginação."""
    result = await db.execute(select(models.User).offset(skip).limit(limit))
    return result.scalars().all()

async def create_user(db: AsyncSession, user: schemas.UserCreate):
    """Cria um novo utilizador na base de dados."""
    new_user = models.User(
        id=str(uuid.uuid4()),
        name=user.name,
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
    
    # Pega os dados do Pydantic e atualiza o objeto SQLAlchemy
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
