import React from 'react';
import { LoggedIn, LoggedOut } from '@solid/react'
import Login from "./Login";
import Save from './Save'
import Logout from './Logout'
import LoggedInAs from './LoggedInAs'

import '../style/Header.css'

const Header = props => (
    <div className="Header">
        <div className="Left-Section">
            <b>Solid Paste</b>
        </div>

        <div className="Right-Section">
            <LoggedIn>
                <LoggedInAs className="LoggedInAs"/>
                <Save onSave={props.onSave}/>
                <Logout />
            </LoggedIn>
            <LoggedOut>
                <Login />
            </LoggedOut>
        </div>
    </div>
);

export default Header;