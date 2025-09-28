import uuid
from sqlalchemy import Column, String, Boolean, JSON, DateTime
from sqlalchemy.orm import declarative_base
from sqlalchemy.sql import func

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'

    # Colunas existentes
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, nullable=False)
    status = Column(String, default='active')
    is_high_value = Column(Boolean, default=False)
    
    financial_features = Column(JSON, nullable=True) 
    security_profile = Column(JSON, nullable=True)
    
    # --- NOVAS COLUNAS PARA AUTENTICAÇÃO ---
    cpf = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    # ----------------------------------------
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
