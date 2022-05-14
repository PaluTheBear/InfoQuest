from pydantic import BaseModel

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