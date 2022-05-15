import React from "react";

const SubtaskValidator = ({type, succeeded, current, onSuccess, ...props}) => {
    switch (type) {
        case 'Checkmark':
            return <div>
                <input type="checkbox" onChange={e => {
                    if (e.target.checked) {
                        onSuccess();
                    }

                }} disabled={!current} checked={succeeded}/>
                <span> Ich habe diese Aufgabe abgeschlossen (wirklich!)</span>
            </div>
        case 'Password':
            return <div>
                <input type="input" onChange={e => {
                    if (e.target.value === props.solution) {
                        onSuccess();
                    }
                }} disabled={!current}/>
                <span> Gib die richtige Antwort ein</span>
            </div>;
    }
}

export default SubtaskValidator;