import * as PropTypes from "prop-types";
import React from "react";
import "./Components.css"
import {NavLink} from "react-router-dom";

const QuestLineComponent = ({title, id}) => {
    return (
        <NavLink to={`questLine/${id}`} className="noLink">
            <div className="QuestLineComponent">
                {title}
            </div>
        </NavLink>
    );
}

QuestLineComponent.propTypes = {
    title: PropTypes.string,
    handleOnClick: PropTypes.func
}

export default QuestLineComponent
