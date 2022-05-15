import sqlite3

from APIModels import ProgressSummary, QuestProgress

# Initialization
con = sqlite3.connect('infoquest.db')
con.execute("create table if not exists UserProgress (user_id, quest_id, subtask_id)")

def get_user_progress(user_id: int):
    with con:
        quest_progresses = con.execute("select quest_id, subtask_id from UserProgress where user_id = %i" % user_id)
        progress_summary = ProgressSummary()
        for progress in quest_progresses:
            quest_progress = QuestProgress(
                quest_id=progress[0],
                subtask_id=progress[1]
            )
            progress_summary.quests.append(quest_progress)
        return progress_summary

def update_user_progress(user_id: int, progress_update:QuestProgress):
    with con:
        con.execute("insert into UserProgress values (?, ?, ?)", (user_id, progress_update.quest_id, progress_update.subtask_id))

def delete_user_progress(user_id: int):
    with con:
        con.execute("delete from UserProgress where user_id = %i" % user_id)