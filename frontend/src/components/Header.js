import React from 'react';
import { LoggedIn, AuthButton } from '@solid/react'
import Save from './Save'
import LoggedInAs from './LoggedInAs'

import '../style/Header.css'
import {Route, withRouter} from "react-router-dom";

const Header = props => (
    <div className="Header">
        <div className="Left-Section">
            <div className="Solid-Paste" onClick={() => props.history.push('/')}>
                <b>Solid Paste</b>
            </div>
        </div>

        <div className="Right-Section">
            <LoggedIn>
                <LoggedInAs className="LoggedInAs"/>
                <Route exact={true} path="/" render={props => <Save {...props} onSave={props.onSave}/>}/>
            </LoggedIn>
            <AuthButton popup="popup.html" login="Login" logout="Logout"/>
        </div>
    </div>
);

export default withRouter(Header);
