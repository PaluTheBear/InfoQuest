from pydantic import BaseModel
from typing import List

class Validation(BaseModel):
    type: str
    solution: str = None

class Subtask(BaseModel):
    title: str
    description: str = None
    validation: Validation = None

class QuestLine(BaseModel):
    id: int
    title: str
    quests: List[int] = []

class Quest(BaseModel):
    id: int
    title: str
    subtasks: List[Subtask] = []

class QuestProgress(BaseModel):
    quest_id: int
    subtask_id: int
