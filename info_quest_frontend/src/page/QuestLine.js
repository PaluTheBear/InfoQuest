import React from "react";
import { useState, useEffect, useContext } from "react";
import './QuestLine.css';
import { GiBookmarklet } from 'react-icons/gi';
import { getQuest, getQuestline } from "../util/RestHandler";
import Xarrow from "react-xarrows";
import { NavLink } from "react-router-dom";
import CurrentUserContext from "../user";

const QuestLine = ({ questLineId }) => {
    const [quests, setQuests] = useState([]);

    useEffect(() => {
        const loadQuests = async () => {
            const questLine = await getQuestline(questLineId);
            console.log(questLine)
            const quests = await Promise.all(questLine.quests.map(getQuest));

            return quests;
        };

        loadQuests().then(setQuests);
    }, [ questLineId ]);

    const userProgress = useContext(CurrentUserContext);

    return (
        <>
            {quests.map((quest, idx) => {
                if (idx >= quests.length - 1) {
                    return;
                }

                const nextQuest = quests[idx + 1];

                return <Xarrow
                        key={quest.id}
                        start={quest.id.toString()}
                        end={nextQuest.id.toString()}
                        color='black'
                        animateDrawing={true}
                       />;
            })}
            <div className='quest-line'>
                {quests.map(quest => (
                    <NavLink className='quest' to={`/quest/${quest.id}`}>
                        <div>
                            <div className='quest-sign' id={quest.id.toString()} key={quest.id}>
                                <GiBookmarklet />
                            </div>
                            <div className='quest-text'>
                                {quest.title}
                                <br />
                                (
                                 {userProgress.find(entry => entry.quest_id === quest.id)?.subtask_id || 0}
                                 /
                                 {quest.subtasks.length}
                                )
                            </div>
                        </div>
                    </NavLink>
                ))}
            </div>
        </>
    );
}

export default QuestLine;