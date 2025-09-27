# data/database.py
import json
from datetime import datetime

DB_FILE = 'db.json'

class Database:
    def __init__(self):
        with open(DB_FILE, 'r', encoding='utf-8') as f:
            self._data = json.load(f)
        print('[DB] Banco de dados (db.json) carregado em memória.')

    def get_user(self, user_id: str):
        return self._data['users'].get(user_id)
    
    def get_notifications(self, user_id: str):
        return self._data['notifications'].get(user_id)
        
    def get_event_log(self):
        return self._data['event_log']

    def add_notification(self, user_id: str, notification: dict):
        self._data['notifications'][user_id].append(notification)
    
    def add_event_log(self, event: dict):
        event['timestamp'] = datetime.now().isoformat()
        self._data['event_log'].append(event)

db = Database()