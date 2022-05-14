import QuestLineComponent from "../components/QuestLineComponent";
import * as PropTypes from "prop-types";
import React from "react";

const Landing = ({questLineJson}) => {

    return (
        <div className="LandingPage">
            {questLineJson.map(ql => (
                <QuestLineComponent title={ql.title}/>
            ))}
        </div>)
}

Landing.propTypes = {
    questLineJson: PropTypes.array
}

export default Landing;