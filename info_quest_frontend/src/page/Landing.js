import QuestLineComponent from "../components/QuestLineComponent";
import * as PropTypes from "prop-types";
import React from "react";

const Landing = ({questLineJson}) => {

    return (
        <div className="LandingPage">o
            {questLineJson.map(ql => (
                <QuestLineComponent title={ql.title}/>
            ))}
        </div>)
}

Landing.propTypes = {
    questLineJson: PropTypes.object
}

export default Landing;