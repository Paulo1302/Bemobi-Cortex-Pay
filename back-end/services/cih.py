# services/cih.py
from collections import defaultdict

class CentralIntelligenceHub:
    def __init__(self):
        print('[CIH] Hub de Inteligência Ativo.')
        self._subscribers = defaultdict(list)

    def subscribe(self, topic: str, callback):
        print(f"[CIH] Agente '{callback.__module__}' inscrito no tópico '{topic}'")
        self._subscribers[topic].append(callback)

    def publish(self, topic: str, data: dict):
        print(f"🚀 [CIH] Evento publicado no tópico '{topic}': {data}")
        if topic in self._subscribers:
            for callback in self._subscribers[topic]:
                callback(data)

# Singleton para garantir uma única instância em toda a aplicação
cih = CentralIntelligenceHub()