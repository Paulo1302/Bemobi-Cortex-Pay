# back-end-python/api/schemas.py

from pydantic import BaseModel
from typing import Optional, Dict, Any

# --- Esquemas para a entidade User ---

# Esquema base com os campos comuns a todas as operações
class UserBase(BaseModel):
    name: str
    status: Optional[str] = 'active'
    is_high_value: Optional[bool] = False
    financial_features: Optional[Dict[str, Any]] = None
    security_profile: Optional[Dict[str, Any]] = None

# Esquema para a criação de um utilizador (herda do base)
# É usado como o tipo do argumento 'user' na função create_user
class UserCreate(UserBase):
    pass

# Esquema para a atualização (todos os campos são opcionais)
# É usado como o tipo do argumento 'user_update' na função update_user
class UserUpdate(BaseModel):
    name: Optional[str] = None
    status: Optional[str] = None
    is_high_value: Optional[bool] = None
    financial_features: Optional[Dict[str, Any]] = None
    security_profile: Optional[Dict[str, Any]] = None

# Esquema para a leitura de um utilizador (inclui o 'id')
# É usado para formatar a resposta da API ao enviar dados para o front-end
class User(UserBase):
    id: str

    class Config:
        from_attributes = True # Permite que o Pydantic leia dados de objetos ORM