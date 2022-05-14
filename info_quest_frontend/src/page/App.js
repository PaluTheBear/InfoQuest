import './App.css';
import React, {useEffect, useState} from "react";
import LoadingPage from "./LoadingPage";
import Header from "../components/Header"
import Landing from "./Landing";
import QuestLine from "./QuestLine";
import Quest from "./Quest";
import {getQuestlines, getUserInfo} from "../util/RestHandler";
import {Route, Routes} from 'react-router-dom'

const App = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [page, setPage] = useState("LANDING")
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

    const handleQuestLineClick = () => {
        setPage("QUESTLINE")
    }

    const getRenderPage = () => {
        if (page === "LANDING") return <Landing questLineJson={questLines} onClick={handleQuestLineClick}/>
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
                    <Routes>
                        <Route path="/" element={<Landing questLineJson={questLines} onClick={handleQuestLineClick}/>}/>
                        <Route path="/questLine">
                            <Route path=":id" element={<QuestLine questLine={questLines[0]}/>}/>
                        </Route>
                        <Route path="/quest">
                            <Route path=":id" element={<Quest/>}/>
                        </Route>
                    </Routes>
                </div>
            </div>
            }
        </div>
    );
}

export default App;
