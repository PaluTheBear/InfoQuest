import React, {useContext, useEffect, useState} from "react";
import {getQuest} from "../util/RestHandler";
import CurrentUserContext from "../user";
import SubtaskValidator from "../components/SubTaskValidator";

const Quest = ({questId}) => {
    // We need this as a number...
    questId = parseInt(questId);

    const [questData, setQuestData] = useState({
        title: '',
        subtasks: []
    });

    useEffect(() => {
        async function fetchData() {
            const rQuest = await getQuest(questId);
            setQuestData(rQuest)
        }

        fetchData();
    }, [questId])

    const userProgress = useContext(CurrentUserContext);
    const progress = userProgress.find(progressEntry => progressEntry.quest_id === questId)?.subtask_id || 0;

    return (
        <div>
            <h1>{questData.title} ({progress}/{questData.subtasks.length})</h1>
            {questData.subtasks.map(
                (subTask, taskIdx) => (
                    <div key={subTask.title}>
                        <h2>{subTask.title}</h2>
                        <p>{subTask.description}</p>
                        <SubtaskValidator {...subTask.validation} current={taskIdx === progress}
                                          succeeded={progress > taskIdx} onSuccess={() => {
                            userProgress.updateProgress(questId, progress + 1);
                        }}/>
                    </div>
                )
            )}
        </div>
    );
}


export default Quest;