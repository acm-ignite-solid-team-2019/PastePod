import React from 'react';
import '../style/Header.css'

const Header = props => (
    <div className="App-header">
        {"Solid Paste"}
        <button onClick={props.onSave}>Save</button>
    </div>
);

export default Header;