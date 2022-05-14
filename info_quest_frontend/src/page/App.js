import './App.css';
import React, {useState} from "react";
import LoadingPage from "./LoadingPage";
import Header from "../components/Header"
import Landing from "./Landing";
import QuestLine from "./QuestLine";
import Quest from "./Quest";

const App = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [page, setPage] = useState("LANDING")

    setTimeout(() => setIsLoading(false), 3000)

    const getRenderPage = () => {
        if (page === "LANDING") return <Landing/>
        else if (page === "QUESTLINE") return <QuestLine/>
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
