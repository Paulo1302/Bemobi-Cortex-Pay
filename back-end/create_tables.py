# create_tables.py
import asyncio
from data.database import engine  # Importa seu engine já configurado
from data.models import Base       # Importa a Base dos seus modelos

async def create_all_tables():
    print("Iniciando a criação das tabelas...")
    async with engine.begin() as conn:
        # Apaga todas as tabelas existentes (CUIDADO EM PRODUÇÃO!)
        # await conn.run_sync(Base.metadata.drop_all)
        
        # Cria todas as tabelas que herdam de Base
        await conn.run_sync(Base.metadata.create_all)
    print("Tabelas criadas com sucesso!")

if __name__ == "__main__":
    asyncio.run(create_all_tables())