# back-end/data/models.py

import uuid
from sqlalchemy import Column, String, Float, Boolean, JSON, DateTime
from sqlalchemy.orm import declarative_base
from sqlalchemy.sql import func

# A Base que todos os nossos modelos de tabela irão herdar
Base = declarative_base()

class User(Base):
    __tablename__ = 'users'

    # Colunas da tabela
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, nullable=False)
    status = Column(String, default='active')
    is_high_value = Column(Boolean, default=False)
    
    financial_features = Column(JSON, nullable=True) 
    security_profile = Column(JSON, nullable=True)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
