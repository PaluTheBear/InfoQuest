import React from "react";
import { useState, useEffect } from "react";
import './QuestLine.css';
import { GiBookmarklet } from 'react-icons/gi';
import { getQuest, getQuestline } from "../util/RestHandler";
import Xarrow from "react-xarrows";
import { Link } from "react-router-dom";

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
                    <Link className='quest' to={`/quest/${quest.id}`}>
                        <div>
                            <div className='quest-sign' id={quest.id.toString()} key={quest.id}>
                                <GiBookmarklet />
                            </div>
                            <div className='quest-text'>{quest.title}</div>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
}

export default QuestLine;