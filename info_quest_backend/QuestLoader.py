from yaml import load, dump

from APIModels import *
try:
    from yaml import CLoader as Loader, CDumper as Dumper
except ImportError:
    from yaml import Loader, Dumper

all_questlines = {}
all_quests = {}

def _load_questlines():
    with open('./data/questlines.yaml', 'rt', encoding='utf-8') as questlines_file:
        data = load(questlines_file, Loader=Loader)
        questline_id = 0
        for questline_yaml in data:
            questline_yaml = questline_yaml['questline']
            questline = QuestLine(
                id = questline_id,
                title = questline_yaml['title'])
            questline.quests = [_load_quest(quest_path) for quest_path in questline_yaml['quests']]
            all_questlines[questline_id] = questline
            questline_id += 1

def _load_quest(quest_path: str):
    with open(quest_path, 'rt', encoding='utf-8') as quest_file:
        quest_yaml = quest_file.read()
        quest_id = hash(quest_yaml)
        quest_data = load(quest_yaml, Loader=Loader)
        if not quest_data:
            return -1
        quest = Quest(
            id = quest_id, 
            title = quest_data['title'])
        for subtask_yaml in quest_data['subtasks']:
            subtask_yaml = subtask_yaml['subtask']
            subtask = Subtask(
                title = subtask_yaml['title'],
                description= subtask_yaml['description'])
            validation_yaml = subtask_yaml['validation']
            subtask.validation = Validation(
                type = validation_yaml['type'],
                solution = validation_yaml['solution'])
        all_quests[quest_id] = quest
        return quest_id

def get_all_questlines():
    return list(all_questlines.values())

def get_questline(questline_id: int):
    return all_questlines[questline_id]

def get_quest(quest_id: int):
    return all_quests[quest_id]

# Initialization
_load_questlines()
