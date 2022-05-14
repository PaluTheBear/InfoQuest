import React from "react";
import { useState, useEffect } from "react";
import './QuestLine.css';
import { GiBookmarklet } from 'react-icons/gi';
import { getQuest } from "../util/RestHandler";
import Xarrow from "react-xarrows";

const QuestLine = ({ questLine }) => {
    const [quests, setQuests] = useState([]);

    useEffect(() => {
        const quests = Promise.all(questLine.quests.map(getQuest));

        quests.then(setQuests)
    }, [ questLine ]);

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
            <div className='quest-line' id="amogus">
                {quests.map(quest => (
                    <div className='quest'>
                        <div className='quest-sign' id={quest.id.toString()} key={quest.id}>
                            <GiBookmarklet />
                        </div>
                        <div className='quest-text'>{quest.title}</div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default QuestLine;