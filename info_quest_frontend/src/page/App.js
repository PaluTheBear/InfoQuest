import logo from '../logo.svg';
import './App.css';
import {useState} from "react";
import LoadingPage from "./LoadingPage";
import Header from "../components/Header"

const App = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [page, setPage] = useState("LANDING")

    setTimeout(() => setIsLoading(false), 3000)

    return (
        <div>
            {isLoading &&
            <LoadingPage/>
            }
            {!isLoading &&
            // Todo: Header Bar with Icon, Title and Userinfo
            <div className="App">
                <Header title={page}/>
                <div className="RenderPage">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo"/>
                        <p>
                            Edit <code>src/App.js</code> and save to reload.
                        </p>
                        <a
                            className="App-link"
                            href="https://reactjs.org"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Learn React
                        </a>
                    </header>
                </div>
            </div>
            }
        </div>
    );
}

export default App;
