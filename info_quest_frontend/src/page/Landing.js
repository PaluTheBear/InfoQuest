import QuestLineComponent from "../components/QuestLineComponent";
import * as PropTypes from "prop-types";
import "./Landing.css"
import React from "react";

const Landing = ({questLineJson}) => {

    return (
        <div className="LandingPage">
            {questLineJson.map((ql, index) => (
                <QuestLineComponent title={ql.title} id={index}/>
            ))}
        </div>)
}

Landing.propTypes = {
    questLineJson: PropTypes.array
}

export default Landing;