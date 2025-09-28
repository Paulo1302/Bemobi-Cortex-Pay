from pydantic import BaseModel
from typing import Optional, Dict, Any

# --- ESQUEMAS PARA AUTENTICAÇÃO ---

class Token(BaseModel):
    """Esquema para a resposta do endpoint de login."""
    access_token: str
    token_type: str

class TokenData(BaseModel):
    """Esquema para os dados contidos dentro do token JWT."""
    cpf: Optional[str] = None


# --- ESQUEMAS PARA A ENTIDADE USER ---

class UserBase(BaseModel):
    """Campos base partilhados por todos os esquemas de utilizador."""
    name: str
    cpf: str
    status: Optional[str] = 'active'
    is_high_value: Optional[bool] = False
    financial_features: Optional[Dict[str, Any]] = None
    security_profile: Optional[Dict[str, Any]] = None

class UserCreate(BaseModel):
    # Campos que o usuário DEVE fornecer no formulário
    name: str
    cpf: str
    password: str

    # Campos que agora são opcionais. Se o front-end não os enviar,
    # o Pydantic usará estes valores padrão.
    status: Optional[str] = 'active'
    is_high_value: Optional[bool] = False
    financial_features: Optional[Dict[str, Any]] = None
    security_profile: Optional[Dict[str, Any]] = None

class UserUpdate(BaseModel):
    """Esquema usado para atualizar um utilizador. Todos os campos são opcionais."""
    name: Optional[str] = None
    status: Optional[str] = None
    is_high_value: Optional[bool] = None
    financial_features: Optional[Dict[str, Any]] = None
    security_profile: Optional[Dict[str, Any]] = None

class User(UserBase):
    """Esquema usado para retornar um utilizador da API. Não inclui a senha."""
    id: str

    class Config:
        # Permite que o Pydantic crie o esquema a partir de um objeto ORM (SQLAlchemy)
        from_attributes = True

