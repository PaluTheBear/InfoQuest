import React, {useEffect, useState, useContext} from "react";
import {getQuest} from "../util/RestHandler";
import CurrentUserContext from "../user";

const Quest = ({ questId }) => {
    const [questData, setQuestData] = useState({
        title: '',
        subtasks: []
    });

    useEffect(() => {
        async function fetchData() {
            const rQuest = await getQuest(questId);
            console.log(rQuest)
            setQuestData(rQuest)
        }

        fetchData();
    }, [ questId ])

    const userProgress = useContext(CurrentUserContext);
    //const progress = userProgress.find(progressEntry => progressEntry.id === questId)?.progress || 0;
    const progress = 0;

    return (
        <div>
            <h1>{questData.title} ({progress}/{questData.subtasks.length})</h1>
            {questData.subtasks.map(
                (subTask, taskIdx) => (
                    <div key={subTask.title}>
                        <h2>{subTask.title}</h2>
                        <p>{subTask.description}</p>
                        <SubtaskValidator {...subTask.validation} succeeded={progress > taskIdx} onSuccess={() => {
                            userProgress.updateProgress(questId, progress + 1);
                        }} />
                    </div>
                )
            )}
        </div>
    );
}

const SubtaskValidator = ({ type, succeeded, onSuccess, ...props }) => {
    switch (type) {
        case 'checkmark':
            return <div>
                <input type="checkbox" onChange={e => {
                    if (e.target.checked) {
                        onSuccess();
                    }

                }} disabled={succeeded}></input>
                <span>Ich habe diese Aufgabe abgeschlossen (wirklich!)</span>
            </div>
        case 'question':
            return <div>
                <input type="input" onChange={e => {
                    if (e.target.value === props.answer) {
                        onSuccess();
                    }
                }} disabled={succeeded}></input>
                <span>Gib die richtige Antwort ein</span>
            </div>;
    }
}

export default Quest;