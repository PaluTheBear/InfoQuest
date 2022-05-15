import './App.css';
import React, {useEffect, useState} from "react";
import LoadingPage from "./LoadingPage";
import Header from "../components/Header"
import Landing from "./Landing";
import QuestLine from "./QuestLine";
import Quest from "./Quest";
import {getQuestlines, getUserInfo, updateProgress} from "../util/RestHandler";
import {Route, Routes, useParams} from 'react-router-dom'
import CurrentUserContext from '../user';

const App = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [questLines, setQuestLines] = useState([])
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
        let loading = false;

        async function fetchUserInfo() {
            return await getUserInfo()
                .then((result) => {
                    if (result === undefined) throw result;
                    return result;
                })
        }

        async function fetchQuestLines() {
            return await getQuestlines()
                .then(result => {
                    if (result === undefined) throw result;
                    return result;
                })
        }

        fetchUserInfo()
            .then(result => setUserInfo(result))
            .catch(err => {
                loading = true
                console.error(`Resthandler returned: ${err}`)
            })
            .finally(() => {
                setIsLoading(loading) // Is this thread safe?!?
                console.log("Fetched User Info")
            })

        fetchQuestLines()
            .then(result => setQuestLines(result))
            .catch(err => {
                loading = true
                console.error(`Resthandler returned: ${err}`)
            })
            .finally(() => {
                setIsLoading(loading) // Is this thread safe?!?
                console.log("Fetched Quest Lines")
            })


    }, [])

    useEffect(() => {
        setIsLoading(!(questLines !== null && userInfo !== null))
    }, [questLines, userInfo])

    const QuestLinePage = () => {
        const {id} = useParams();

        return <QuestLine questLineId={id}/>;
    }

    const QuestPage = () => {
        const {id} = useParams();

        return <Quest questId={id}/>;
    }

    const Index = () => {
        return (
            <>
                {isLoading && <LoadingPage/>}
                {!isLoading && <Landing questLineJson={questLines}/>}
            </>
        );
    }

    return (
        <CurrentUserContext.Provider value={userInfo}>
            <div>
                <div className="App">
                    <Header title={""}/>
                    <div className="RenderPage">
                        <Routes>
                            <Route path="/" element={<Index/>}/>
                            <Route path="/questLine">
                                <Route path=":id" element={<QuestLinePage/>}/>
                            </Route>
                            <Route path="/quest">
                                <Route path=":id" element={<QuestPage/>}/>
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
