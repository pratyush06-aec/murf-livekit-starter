import sqlite3
import json
from datetime import datetime
import logging

logger = logging.getLogger("db")
DB_PATH = "caller_data.db"

def init_db():
    try:
        with sqlite3.connect(DB_PATH) as conn:
            cursor = conn.cursor()
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS users (
                    user_id TEXT PRIMARY KEY,
                    name TEXT,
                    language_preference TEXT,
                    facts TEXT,
                    last_interaction DATETIME
                )
            ''')
            conn.commit()
    except Exception as e:
        logger.error("Failed to initialize database: %s", e)

def get_caller(user_id: str) -> dict | None:
    try:
        with sqlite3.connect(DB_PATH) as conn:
            conn.row_factory = sqlite3.Row
            cursor = conn.cursor()
            cursor.execute('SELECT * FROM users WHERE user_id = ?', (user_id,))
            row = cursor.fetchone()
            if row:
                data = dict(row)
                if data.get('facts'):
                    try:
                        data['facts'] = json.loads(data['facts'])
                    except:
                        data['facts'] = {}
                return data
            return None
    except Exception as e:
        logger.error("Failed to fetch caller data: %s", e)
        return None

def upsert_caller(user_id: str, name: str, language_preference: str, facts: str | dict):
    try:
        if isinstance(facts, dict):
            facts_str = json.dumps(facts)
        else:
            facts_str = facts

        now = datetime.utcnow().isoformat()
        
        with sqlite3.connect(DB_PATH) as conn:
            cursor = conn.cursor()
            cursor.execute('''
                INSERT INTO users (user_id, name, language_preference, facts, last_interaction)
                VALUES (?, ?, ?, ?, ?)
                ON CONFLICT(user_id) DO UPDATE SET
                    name = excluded.name,
                    language_preference = excluded.language_preference,
                    facts = excluded.facts,
                    last_interaction = excluded.last_interaction
            ''', (user_id, name, language_preference, facts_str, now))
            conn.commit()
    except Exception as e:
        logger.error("Failed to upsert caller data: %s", e)
