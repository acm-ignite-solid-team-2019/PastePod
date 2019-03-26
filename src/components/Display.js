import React from 'react';
import Highlight from "react-highlight";
import '../style/Display.css'

const Display = props => (
    <div className="Display">
        <Highlight language={props.lang}>
            {props.text}
        </Highlight>
    </div>
);

export default Display;