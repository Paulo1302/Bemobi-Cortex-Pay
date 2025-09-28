# data/database.py
import json
from datetime import datetime
import os
from dotenv import load_dotenv

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker



load_dotenv()
DB_FILE = os.getenv("DB_FILE")

if DB_FILE is None:
    raise ValueError("A variável de ambiente DATABASE_URL não foi definida. Crie um ficheiro .env.")
engine = create_engine(DB_FILE)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()