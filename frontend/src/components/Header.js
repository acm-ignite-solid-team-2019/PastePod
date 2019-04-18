import React from 'react';
import { LoggedIn, AuthButton } from '@solid/react'
import Save from './Save'
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
            </LoggedIn>
            <AuthButton popup="popup.html" login="Login" logout="Logout"/>
        </div>
    </div>
);

export default Header;
