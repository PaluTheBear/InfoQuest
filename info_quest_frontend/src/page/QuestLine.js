import React from "react";
import { useState, useEffect } from "react";
import './QuestLine.css';
import { GiBookmarklet } from 'react-icons/gi';

const QuestLine = ({ questLine }) => {
    return (
        <div className='quest-line'>
            {questLine.quests.map(quest => (
                <div className='quest' key={quest}>
                    <GiBookmarklet />
                </div>
            ))}
        </div>
    );
}

export default QuestLine;