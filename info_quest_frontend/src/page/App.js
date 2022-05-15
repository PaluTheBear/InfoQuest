import './App.css';
import React, {useEffect, useState} from "react";
import LoadingPage from "./LoadingPage";
import Header from "../components/Header"
import Landing from "./Landing";
import QuestLine from "./QuestLine";
import Quest from "./Quest";
import {getQuestlines, getUserInfo} from "../util/RestHandler";
import {Route, Routes, useParams} from 'react-router-dom'
import CurrentUserContext from '../user';
import { updateProgress } from '../util/RestHandler';

const App = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [page, setPage] = useState("LANDING")
    const [questLines, setQuestLines] = useState([{title: "questLineTitel"}])
    const [userInfo, setUserInfo] = useState([{id: 0, progress: 5}, {id: 2, progress: 2}])

    userInfo.updateProgress = async (questId, progress) => {
        console.log('old prog');
        console.log(userInfo);
        await updateProgress(questId, progress);

        const updatedUserInfo = await getUserInfo();
        console.log(questId + ' ' + progress)

        console.log('new prog');
        console.log(updatedUserInfo);
        setUserInfo(updatedUserInfo);
    };

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

    const QuestLinePage = () => {
        const { id } = useParams();

        return <QuestLine questLineId={id}/>;
    }

    const QuestPage = () => {
        const { id } = useParams();

        return <Quest questId={id}/>;
    }

    return (
        <CurrentUserContext.Provider value={userInfo}>
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
                                <Route path=":id" element={<QuestLinePage />}/>
                            </Route>
                            <Route path="/quest">
                                <Route path=":id" element={<QuestPage />}/>
                            </Route>
                        </Routes>
                    </div>
                </div>
                }
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
