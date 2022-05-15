import './Header.css';
import './Components.css';
import React, { useContext } from "react";
import logo from '../logo.png';
import { BiUserCircle } from 'react-icons/bi';
import CurrentUserContext from '../user';
import { NavLink } from 'react-router-dom';

const Header = () => {

    const userProgress = useContext(CurrentUserContext);

    const totalSubtasksDone = userProgress.map(entry => entry.subtask_id).reduce((a, b) => a + b, 0);
    const level = Math.floor(totalSubtasksDone / 10 + 1);
    const restXp = (totalSubtasksDone % 10) * 10;

    return (
        <div className="PageHeader">
            <NavLink to="/" className="noLink">
                <div className="AppIcon">
                    <img src={logo} className="AppLogo" alt="logo"/>
                    <h1>InfoQuest</h1>
                </div>
            </NavLink>
            <div className="ProfileWidget">
                <h3>Lvl {level} ({restXp}/100XP)</h3>
                <BiUserCircle className="UserIcon" />
            </div>
        </div>
    )
}

export default Header;