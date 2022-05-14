import QuestLineComponent from "../components/QuestLineComponent";
import * as PropTypes from "prop-types";
import "./Landing.css"
import React from "react";

const Landing = ({questLineJson, onClick}) => {

    return (
        <div className="LandingPage">
            {questLineJson.map(ql => (
                <QuestLineComponent title={ql.title} onClick={onClick}/>
            ))}
        </div>)
}

Landing.propTypes = {
    questLineJson: PropTypes.array
}

export default Landing;