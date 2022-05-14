import * as PropTypes from "prop-types";
import React from "react";
import "./Components.css"
import {Link} from "react-router-dom";

const QuestLineComponent = ({title, id}) => {
    return (
        <Link to={`questLine/${id}`}>
            <div className="QuestLineComponent">
                {title}
            </div>
        </Link>
    );
}

QuestLineComponent.propTypes = {
    title: PropTypes.string,
    handleOnClick: PropTypes.func
}

export default QuestLineComponent
