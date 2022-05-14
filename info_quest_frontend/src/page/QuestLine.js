import React from "react";
import { useState, useEffect } from "react";
import './QuestLine.css';
import { GiBookmarklet } from 'react-icons/gi';
import { getQuest } from "../util/RestHandler";

const QuestLine = ({ questLine }) => {
    const [quests, setQuests] = useState([])

    useEffect(() => {
        const quests = Promise.all(questLine.quests.map(getQuest));

        quests.then(setQuests)
    }, [ questLine ]);

    return (
        <div className='quest-line'>
            {quests.map(quest => (
                <div className='quest' key={quest.id}>
                    <GiBookmarklet />
                </div>
            ))}
        </div>
    );
}

export default QuestLine;