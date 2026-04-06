
import sqlite3
from datetime import datetime

def get_db():
    conn = sqlite3.connect("db.sqlite3")
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    db = get_db()
    db.execute("""
    CREATE TABLE IF NOT EXISTS history(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        question TEXT NOT NULL,
        answer TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)
    db.commit()
    db.close()

def save_to_history(question, answer):
    """Save chat conversation to history"""
    try:
        db = get_db()
        db.execute(
            "INSERT INTO history (question, answer) VALUES (?, ?)",
            (question, answer)
        )
        db.commit()
        db.close()
        return True
    except Exception as e:
        print(f"Error saving to history: {str(e)}")
        return False

def get_history():
    """Retrieve all chat history"""
    try:
        db = get_db()
        data = db.execute("SELECT * FROM history ORDER BY created_at DESC").fetchall()
        db.close()
        return [dict(x) for x in data]
    except Exception as e:
        print(f"Error retrieving history: {str(e)}")
        return []

def get_history_by_id(history_id):
    """Retrieve specific chat history by ID"""
    try:
        db = get_db()
        data = db.execute("SELECT * FROM history WHERE id = ?", (history_id,)).fetchone()
        db.close()
        return dict(data) if data else None
    except Exception as e:
        print(f"Error retrieving history by ID: {str(e)}")
        return None

def clear_history():
    """Clear all chat history"""
    try:
        db = get_db()
        db.execute("DELETE FROM history")
        db.commit()
        db.close()
        return True
    except Exception as e:
        print(f"Error clearing history: {str(e)}")
        return False
    
