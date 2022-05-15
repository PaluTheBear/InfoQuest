import './Header.css'
import React, { useContext } from "react";
import logo from '../logo.png';
import { BiUserCircle } from 'react-icons/bi';
import CurrentUserContext from '../user';

const Header = () => {

    const userProgress = useContext(CurrentUserContext);

    const totalSubtasksDone = userProgress.map(entry => entry.subtask_id).reduce((a, b) => a + b);
    const level = Math.floor(totalSubtasksDone / 10 + 1);
    const restXp = (totalSubtasksDone % 10) * 10;

    return (
        <div className="PageHeader">
            <div className="AppIcon">
                <img src={logo} className="AppLogo" alt="logo"/>
                <h1>InfoQuest</h1>
            </div>
            <div className="ProfileWidget">
                <h3>Lvl {level} ({restXp}/100XP)</h3>
                <BiUserCircle className='UserIcon' />
            </div>
        </div>
    )
}

export default Header;