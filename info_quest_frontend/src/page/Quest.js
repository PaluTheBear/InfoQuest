import React, {useEffect, useState} from "react";
import {getQuest} from "../util/RestHandler";

const Quest = () => {
    const pid = 0;
    const [questData, setQuestData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const rQuest = await getQuest(pid)
            console.log(rQuest)
            setQuestData(rQuest)
        }

        fetchData()
    }, [])


    return (
        <>
            {questData &&
            <h1>{questData.title}</h1>
            }
            {questData && questData.subtasks && questData.subtasks.map(
                (it) => (
                    <>
                        <h2>{it.title}</h2>
                    </>)
            )
            }
        </>
    );
}

export default Quest;