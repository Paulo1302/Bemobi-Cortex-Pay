import uuid
from sqlalchemy.orm import declarative_base
from sqlalchemy.sql import func
from sqlalchemy import Column, String, Boolean, JSON, DateTime, UniqueConstraint 


Base = declarative_base()

class User(Base):
    __tablename__ = 'users'

    # Adicione uma restrição para garantir que o email seja único em toda a tabela
    __table_args__ = (UniqueConstraint('email', name='uq_user_email'),)

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, nullable=False)
    
    # --- NOVO CAMPO DE EMAIL ---
    email = Column(String, unique=True, index=True, nullable=False)
    # ---------------------------

    cpf = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    
    status = Column(String, default='active')
    is_high_value = Column(Boolean, default=False)
    financial_features = Column(JSON, nullable=True)
    security_profile = Column(JSON, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
