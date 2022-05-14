from APIModels import *
import QuestLoader as ql
import sqlite3
from fastapi import FastAPI

# Database
def get_db():
    con = sqlite3.connect('infoquest.db')
    cur = con.cursor()
    cur.execute("create table if not exists UserProgress (user_id, quest_id, subtask_id)")
    con.commit()
    try:
        yield con
    finally:
        con.close()

# API endpoints
info_quest = FastAPI()

@info_quest.get("/")
async def root():
    return {"message": "hello world"}

@info_quest.get("/questlines", response_model=list[QuestLine])
async def get_questlines():
    return ql.load_questlines()

@info_quest.get("/quests/{quest_id}", response_model=Quest)
async def get_quest(quest_id: int):
    return {"quest_id": quest_id}

@info_quest.get("/users/{user_id}", response_model=ProgressSummary)
async def get_user_progress(user_id: int):
    return {"user_id": user_id}

@info_quest.post("/users/{user_id}", response_model=QuestProgress)
async def update_user_progress(user_id: int, progressUpdate: QuestProgress):
    return progressUpdate
