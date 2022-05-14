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
    quests: list[int] = []

class Quest(BaseModel):
    id: int
    title: str
    subtasks: list[Subtask] = []

class QuestProgress(BaseModel):
    quest_id: int
    subtask_id: int

class ProgressSummary(BaseModel):
    quests: list[QuestProgress] = []