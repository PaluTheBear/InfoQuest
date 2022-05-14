import * as PropTypes from "prop-types";
import React from "react";

const QuestLineComponent = ({title}) => {
    return (
        <div className="QuestLineComponent">
            {title}
        </div>
    );
}

QuestLineComponent.propTypes = {
    title: PropTypes.string
}

export default QuestLineComponent
