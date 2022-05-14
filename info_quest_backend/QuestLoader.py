from yaml import load, dump

from APIModels import *
try:
    from yaml import CLoader as Loader, CDumper as Dumper
except ImportError:
    from yaml import Loader, Dumper

def load_questlines():
    questlines_file = open('./data/questlines.yaml', 'r')
    data = load(questlines_file, Loader=Loader)
    all_questlines = []
    for questline_yaml in data:
        questline_yaml = questline_yaml['questline']
        questline = QuestLine(title = questline_yaml['title'])
        questline.quests = [hash(open(quest_path, 'r')) for quest_path in questline_yaml['quests']]
        all_questlines.append(questline)
    return all_questlines
