from APIModels import *
import QuestLoader as ql
from fastapi import FastAPI

info_quest = FastAPI()

@info_quest.get("/")
async def root():
    return {"message": "hello world"}

@info_quest.get("/questlines", response_model=list[QuestLine])
async def get_questlines():
    return ql.get_all_questlines()

@info_quest.get("/questlines/{questline_id}", response_model=QuestLine)
async def get_questline(questline_id: int):
    return ql.get_questline(questline_id)

@info_quest.get("/quests/{quest_id}", response_model=Quest)
async def get_quest(quest_id: int):
    return ql.get_quest(quest_id)

@info_quest.get("/users/{user_id}", response_model=ProgressSummary)
async def get_user_progress(user_id: int):
    return {"user_id": user_id}

@info_quest.post("/users/{user_id}", response_model=QuestProgress)
async def update_user_progress(user_id: int, progressUpdate: QuestProgress):
    return progressUpdate
