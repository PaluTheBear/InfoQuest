import './App.css';
import React, {useEffect, useState} from "react";
import LoadingPage from "./LoadingPage";
import Header from "../components/Header"
import Landing from "./Landing";
import QuestLine from "./QuestLine";
import Quest from "./Quest";
import {getQuestlines, getUserInfo} from "../util/RestHandler";

const App = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [page, setPage] = useState("QUESTLINE")
    const [questLines, setQuestLines] = useState([{title: "questLineTitel"}])
    const [userInfo, setUserInfo] = useState([{id: 0, progress: 5}, {id: 2, progress: 2}])

    useEffect(() => {
            async function fetchData() {
                const rUI = await getUserInfo()
                const rQL = await getQuestlines()
                setQuestLines(rQL)
                setUserInfo(rUI)
            }

            fetchData()
                .finally(() => setIsLoading(false))
        }, [])

    const getRenderPage = () => {
        if (page === "LANDING") return <Landing questLineJson={questLines}/>
        else if (page === "QUESTLINE") return <QuestLine questLine={questLines[0]}/>
        else if (page === "QUEST") return <Quest/>
    }

    return (
        <div>
            {isLoading &&
            <LoadingPage/>
            }
            {!isLoading &&
            <div className="App">
                <Header title={page}/>
                <div className="RenderPage">
                    {getRenderPage()}
                </div>
            </div>
            }
        </div>
    );
}

export default App;
