import sqlite3

def get_db():
    con = sqlite3.connect('infoquest.db')
    cur = con.cursor()
    cur.execute("create table if not exists UserProgress (user_id, quest_id, subtask_id)")
    con.commit()
    try:
        yield con
    finally:
        con.close()