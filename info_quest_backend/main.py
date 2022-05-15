from APIModels import *
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import QuestLoader as ql
import UserManager as um

info_quest = FastAPI()

origins = ["*"]

info_quest.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@info_quest.get("/")
async def root():
    return {"message": "hello world"}

@info_quest.get("/questlines", response_model=List[QuestLine])
async def get_questlines():
    return ql.get_all_questlines()

@info_quest.get("/questlines/{questline_id}", response_model=QuestLine)
async def get_questline(questline_id: int):
    return ql.get_questline(questline_id)

@info_quest.get("/quests", response_model=List[Quest])
async def get_quests():
    return ql.get_all_quests()

@info_quest.get("/quests/{quest_id}", response_model=Quest)
async def get_quest(quest_id: int):
    return ql.get_quest(quest_id)

@info_quest.get("/users/{user_id}", response_model=List[QuestProgress])
async def get_user_progress(user_id: int):
    return um.get_user_progress(user_id)

@info_quest.post("/users/{user_id}")
async def update_user_progress(user_id: int, progress_update: QuestProgress):
    return um.update_user_progress(user_id, progress_update)

@info_quest.delete("/users/{user_id}")
async def delete_user_progress(user_id: int):
    return um.delete_user_progress(user_id)
