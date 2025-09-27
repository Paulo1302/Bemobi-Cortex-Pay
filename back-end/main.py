# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Importa o módulo 'routes' da pasta 'api'
from api import routes

from agents import agent_orchestrator, agent_grace_plus, agent_guardian

# --- Inicialização do Ecossistema ---
agent_orchestrator.initialize()
agent_grace_plus.initialize()
agent_guardian.initialize()
# ------------------------------------

app = FastAPI(title="Cortex Pay Backend (Python)")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- PONTO CRÍTICO ---
# Esta linha registra todas as rotas do objeto 'router' que está dentro do módulo 'routes'
app.include_router(routes.router, prefix="/api/v1")
print("✅ Roteador da API incluído com o prefixo /api/v1.")


@app.get("/")
def read_root():
    return {"status": "Servidor do Cortex Pay (Python) está ativo!"}