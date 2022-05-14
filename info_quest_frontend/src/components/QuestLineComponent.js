import * as PropTypes from "prop-types";
import React from "react";
import "./Components.css"

const QuestLineComponent = ({title, onClick}) => {
    return (
        <div className="QuestLineComponent" onClick={onClick}>
            {title}
        </div>
    );
}

QuestLineComponent.propTypes = {
    title: PropTypes.string,
    handleOnClick: PropTypes.func
}

export default QuestLineComponent
