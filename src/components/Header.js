import React from 'react';
import Login from "./Login";

import '../style/Header.css'

const Header = props => (
    <div className="App-header">
        {"Solid Paste"}
        <button onClick={props.onSave}>Save</button>
        <Login />
    </div>
);

export default Header;