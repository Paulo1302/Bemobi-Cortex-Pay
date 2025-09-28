
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # Define a variável que esperamos encontrar no ficheiro .env
    DATABASE_URL: str

    class Config:
        # Diz à Pydantic para ler as variáveis de um ficheiro .env
        env_file = ".env"

# Cria uma instância única das configurações para toda a aplicação
settings = Settings()
