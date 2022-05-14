from fastapi import FastAPI
from pydantic import BaseModel

class Validation(BaseModel):
    type: str
    solution: str

class Subtask(BaseModel):
    title: str
    description: str
    validation: Validation

class QuestLine(BaseModel):
    title: str
    quests: list[int]

class Quest(BaseModel):
    id: int
    title: str
    subtasks: list[Subtask]

class QuestProgress(BaseModel):
    quest_id: int
    subtask_id: int

class ProgressSummary(BaseModel):
    quests: list[QuestProgress]

info_quest = FastAPI()

@info_quest.get("/")
async def root():
    return {"message": "hello world"}

@info_quest.get("/questlines", response_model=list[QuestLine])
async def get_questlines():
    return {"message": "many questlines"}

@info_quest.get("/quests/{quest_id}", response_model=Quest)
async def get_quest(quest_id: int):
    return {"quest_id": quest_id}

@info_quest.get("/users/{user_id}", response_model=ProgressSummary)
async def get_user_progress(user_id: int):
    return {"user_id": user_id}

@info_quest.post("/users/{user_id}", response_model=QuestProgress)
async def update_user_progress(user_id: int, progressUpdate: QuestProgress):
    return progressUpdate
