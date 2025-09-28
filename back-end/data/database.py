# back-end/data/database.py

from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from .config import settings # Importa a partir do mesmo diretório 'data'

# Cria o "motor" que se conecta de forma assíncrona à base de dados
engine = create_async_engine(settings.DATABASE_URL, echo=True)

# Cria uma "fábrica" de sessões de base de dados assíncronas
AsyncSessionLocal = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False
)

# Dependência do FastAPI para obter uma sessão de base de dados em cada requisição
async def get_db_session() -> AsyncSession:
    async with AsyncSessionLocal() as session:
        yield session
