import './App.css';
import React, {useEffect, useState} from "react";
import Loading from "./Loading";
import Header from "../components/Header"
import Landing from "./Landing";
import QuestLine from "./QuestLine";
import Quest from "./Quest";
import {getQuestlines, getUserInfo, updateProgress} from "../util/RestHandler";
import {Route, Routes, useParams} from 'react-router-dom'
import CurrentUserContext from '../user';

const App = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [questLines, setQuestLines] = useState([]);
    const [userInfo, setUserInfo] = useState([]);

    userInfo.updateProgress = async (questId, progress) => {
        await updateProgress(questId, progress);

        const updatedUserInfo = await getUserInfo();
        setUserInfo(updatedUserInfo);
    };

    useEffect(() => {
        let loading = false;

        async function fetchUserInfo() {
            return await getUserInfo()
                .then((result) => {
                    if (result === undefined) throw result;
                    return result;
                });
        }

        async function fetchQuestLines() {
            return await getQuestlines()
                .then(result => {
                    if (result === undefined) throw result;
                    return result;
                });
        }

        fetchUserInfo()
            .then(result => setUserInfo(result))
            .catch(err => {
                loading = true
                setIsLoading(loading) // Is this thread safe?!?
                console.error(`Resthandler returned: ${err}`)
            })
            .finally(() => {
                console.log("Fetched User Info")
            });

        fetchQuestLines()
            .then(result => setQuestLines(result))
            .catch(err => {
                loading = true
                setIsLoading(loading) // Is this thread safe?!?
                console.error(`Resthandler returned: ${err}`)
            })
            .finally(() => {
                console.log("Fetched Quest Lines")
            });


    }, [])

    useEffect(() => {
        // 10.3 second startuptime - remove timeout for less startup :P
        // This is only to display our fancy a f loading page. don't judge pls!
        (questLines.length > 0 && userInfo !== null) ? setTimeout(() => setIsLoading(false), 10000) : setIsLoading(true)
    }, [questLines, userInfo]);

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
                {isLoading && <Loading/>}
                {!isLoading && <Landing questLineJson={questLines}/>}
            </>
        );
    }

    return (
        <CurrentUserContext.Provider value={userInfo}>
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
        </CurrentUserContext.Provider>
    );
}

export default App;
